import { ipcMain, IpcMainEvent } from 'electron';
import * as redis from 'redis';
import * as uuid from 'uuid';

import * as dtos from './dtos/redis';
import { jsonTryParse, jsonTryStringify, parseRedisInfo } from './utils';
import Database from './database';
import Logger from './logger';

class Redis {
  private readonly _clients: { [id: string]: redis.RedisClient } = { };
  private _infoTimeout: NodeJS.Timeout;

  constructor() {
    ipcMain.on('redis:client:create', this.clientCreate.bind(this));
    ipcMain.on('redis:client:update', this.clientUpdate.bind(this));
    ipcMain.on('redis:client:connect', this.clientConnect.bind(this));
    ipcMain.on('redis:client:close', this.clientClose.bind(this));
    ipcMain.on('redis:client:remove', this.clientRemove.bind(this));
    ipcMain.on('redis:client:findAll', this.clientFindAll.bind(this));
    ipcMain.on('redis:client:ping', this.clientPing.bind(this));
    ipcMain.on('redis:client:test', this.clientTest.bind(this));

    ipcMain.on('redis:key-value:get', this.keyValueGet.bind(this));
    ipcMain.on('redis:key-value:set', this.keyValueSet.bind(this));
    ipcMain.on('redis:key-value:keys', this.keyValueKeys.bind(this));
    ipcMain.on('redis:key-value:delete', this.keyValueDelete.bind(this));
  }

  ///
  /// Client
  ///

  async clientFindAll(e: IpcMainEvent) {
    const res = await Database.instance.clients.findAll();

    e.sender.send('redis:client:findAll.return', {
      clients: res.map(c => c.toJSON() as any).map(c => {
        c.status = 'closed';
        delete c.updatedAt;
        return c;
      }),
    } as dtos.IClientFindAllResponse);
  }

  async clientCreate(e: IpcMainEvent, v: dtos.IClientCreateRequest) {
    const id = uuid.v1();
    await Database.instance.clients.create({ id, ...v });

    e.sender.send('redis:client:create.return', {
      id,
      status: 'closed',
      ...v,
    } as dtos.IClientCreateResponse);
  }

  async clientUpdate(e: IpcMainEvent, v: dtos.IClientUpdateRequest) {
    await Database.instance.clients.update(v, { where: { id: v.id } });

    e.sender.send('redis:client:update.return', {
      ...v,
      status: this._clients[v.id]?.connected ? 'open' : 'closed',
    } as dtos.IClientUpdateResponse);
  }

  clientConnect(e: IpcMainEvent, v: dtos.IClientConnectRequest) {
    if (this._clients[v.id]) {
      this._clients[v.id].quit();
    }

    this._clients[v.id] = redis.createClient({
      host: v.host,
      port: v.port,
      password: v.password || undefined,
    });

    this._clients[v.id].on('ready', () => this.keyValueKeys(e, { id: v.id }));
    this._clients[v.id].on('connect', () => this._onConnect(e, v.id));
    this._clients[v.id].on('reconnecting', () => this._onReconnect(e, v.id));
    this._clients[v.id].on('end', () => this._onEnd(e, v.id));
    this._clients[v.id].on('error', (err) => this._onError(e, v.id, err));

    this.clientInfo(e, { id: v.id });
    this.clientPing(e, { id: v.id });

    this._infoTimeout = setInterval(() => {
      this.clientInfo(e, { id: v.id });
      this.clientPing(e, { id: v.id });
    }, 300000);
  }

  clientClose(_: IpcMainEvent, v: dtos.IClientCloseRequest) {
    this._clients[v.id].quit();
    clearInterval(this._infoTimeout);
    this._infoTimeout = undefined;
  }

  async clientRemove(_: IpcMainEvent, v: dtos.IClientRemoveRequest) {
    this._clients[v.id]?.quit();
    delete this._clients[v.id];

    clearInterval(this._infoTimeout);
    this._infoTimeout = undefined;

    await Database.instance.clients.destroy({ where: { id: v.id } });
  }

  clientInfo(e: IpcMainEvent, v: dtos.IClientInfoRequest) {
    this._clients[v.id].info((err, i) => {
      if (err) Logger.error('Redis', err.message);

      const info = parseRedisInfo(i as any);

      e.sender.send('redis:client:info.return', {
        id: v.id,
        info: {
          cpu: info.cpu,
          memory: info.memory,
          server: info.server,
        },
      } as dtos.IClientInfoResponse);
    });
  }

  clientPing(e: IpcMainEvent, v: dtos.IClientPingRequest) {
    const now = new Date();

    this._clients[v.id].ping((err) => {
      if (err) Logger.error('Redis', err.message);

      e.sender.send('redis:client:ping.return', {
        id: v.id,
        elapse: (new Date()).getTime() - now.getTime(),
      } as dtos.IClientPingResponse);
    });
  }

  clientTest(e: IpcMainEvent, v: dtos.IClientTestRequest) {
    const client = redis.createClient({
      ...v,
      password: v.password || undefined,
    });

    client.once('connect', () => this._onTestComplete(e, client, true));
    client.once('error', () => this._onTestComplete(e, client, false));
  }

  ///
  /// Key Value
  ///

  keyValueKeys(e: IpcMainEvent, v: dtos.IKeyValueKeysRequest) {
    this._clients[v.id].keys('*', (err, k) => {
      if (err) Logger.error('Redis', err.message);

      const keys = { };

      for (const key of k) {
        keys[key] = undefined;
      }

      e.sender.send('redis:key-value:keys.return', {
        id: v.id,
        keys,
      } as dtos.IKeyValueKeysResponse);
    });
  }

  keyValueGet(e: IpcMainEvent, v: dtos.IKeyValueGetRequest) {
    this._clients[v.id].get(v.key, (err, res) => {
      if (err) Logger.error('Redis', err.message);

      const o = jsonTryParse(res);

      e.sender.send('redis:key-value:get.return', {
        id: v.id,
        key: v.key,
        value: o || res,
      } as dtos.IKeyValueGetResponse);
    });
  }

  keyValueSet(e: IpcMainEvent, v: dtos.IKeyValueSetRequest) {
    this._clients[v.id].set(v.key, jsonTryStringify(v.value) || v.value, (err) => {
      if (err) Logger.error('Redis', err.message);

      e.sender.send('redis:key-value:set.return', v as dtos.IKeyValueSetResponse);
    });
  }

  keyValueDelete(e: IpcMainEvent, v: dtos.IKeyValueDeleteRequest) {
    this._clients[v.id].del(v.key, (err) => {
      if (err) Logger.error('Redis', err.message);

      e.sender.send('redis:key-value:delete.return', v as dtos.IKeyValueDeleteResponse);
    });
  }

  private _onConnect(e: IpcMainEvent, id: string) {
    e.sender.send('redis:client:status', {
      id,
      status: 'open',
    } as dtos.IClientStatusResponse);
  }

  private _onReconnect(e: IpcMainEvent, id: string) {
    e.sender.send('redis:client:status', {
      id,
      status: 'reconnecting',
    } as dtos.IClientStatusResponse);
  }

  private _onEnd(e: IpcMainEvent, id: string) {
    e.sender.send('redis:client:status', {
      id,
      status: 'closed',
    } as dtos.IClientStatusResponse);
  }

  private _onError(e: IpcMainEvent, id: string, err: any) {
    e.sender.send('redis:client:error', {
      id,
      err,
    } as dtos.IClientErrorResponse);
  }

  private _onTestComplete(e: IpcMainEvent, client: redis.RedisClient, success: boolean) {
    e.sender.send('redis:client:test.return', {
      success,
    } as dtos.IClientTestResponse);

    client.quit();
  }
}

export default new Redis();
