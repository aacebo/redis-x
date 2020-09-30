import { ipcMain, IpcMainEvent } from 'electron';
import * as redis from 'redis';
import * as uuid from 'uuid';

import * as dtos from './dtos/redis';
import { jsonTryParse, jsonTryStringify, parseRedisInfo } from './utils';
import Database from './database';

class Redis {
  private readonly _clients: { [id: string]: redis.RedisClient } = { };

  constructor() {
    ipcMain.on('redis:clients:create', this.create.bind(this));
    ipcMain.on('redis:clients:update', this.update.bind(this));
    ipcMain.on('redis:clients:connect', this.connect.bind(this));
    ipcMain.on('redis:clients:close', this.close.bind(this));
    ipcMain.on('redis:clients:remove', this.remove.bind(this));
    ipcMain.on('redis:clients:findAll', this.findAll.bind(this));

    ipcMain.on('redis:key-value:key', this.key.bind(this));
    ipcMain.on('redis:key-value:keys', this.keys.bind(this));
    ipcMain.on('redis:key-value:set', this.keyValueSet.bind(this));
    ipcMain.on('redis:key-value:delete', this.keyValueRemove.bind(this));
  }

  async findAll(e: IpcMainEvent) {
    const res = await Database.instance.clients.findAll();

    e.sender.send('redis:clients:findAll.return', {
      clients: res.map(c => c.toJSON() as any).map(c => {
        c.status = 'closed';
        delete c.updatedAt;
        return c;
      }),
    });
  }

  async create(e: IpcMainEvent, v: dtos.IRedisCreateRequest) {
    const id = uuid.v1();
    await Database.instance.clients.create({ id, ...v });

    e.sender.send('redis:clients:create.return', {
      id,
      status: 'closed',
      ...v,
    });
  }

  async update(e: IpcMainEvent, v: dtos.IRedisUpdateRequest) {
    await Database.instance.clients.update(v, { where: { id: v.id } });

    e.sender.send('redis:clients:update.return', {
      ...v,
      status: this._clients[v.id]?.connected ? 'open' : 'closed',
    });
  }

  connect(e: IpcMainEvent, v: dtos.IRedisConnectRequest) {
    if (this._clients[v.id]) {
      this._clients[v.id].quit();
    }

    this._clients[v.id] = redis.createClient({
      host: v.host,
      port: v.port,
      password: v.password || undefined,
    });

    this._clients[v.id].on('ready', () => this.keys(e, v.id));
    this._clients[v.id].on('connect', () => this._onConnect(e, v.id));
    this._clients[v.id].on('reconnecting', () => this._onReconnect(e, v.id));
    this._clients[v.id].on('end', () => this._onEnd(e, v.id));
    this._clients[v.id].on('error', (err) => this._onError(e, v.id, err));

    this._clients[v.id].info((_err, i) => {
      const info = parseRedisInfo(i as any);

      e.sender.send('redis:clients:info.return', {
        id: v.id,
        info: {
          cpu: info.cpu,
          memory: info.memory,
          server: info.server,
        },
      });
    });
  }

  close(_: IpcMainEvent, id: string) {
    this._clients[id].quit();
  }

  async remove(_: IpcMainEvent, id: string) {
    this._clients[id]?.quit();
    delete this._clients[id];

    await Database.instance.clients.destroy({ where: { id } });
  }

  key(e: IpcMainEvent, v: dtos.IRedisKeyValueRequest) {
    this._clients[v.id].get(v.key, (err, res) => {
      if (err) throw err;

      const o = jsonTryParse(res);
      e.sender.send('redis:key-value:key.return', o || res);
    });
  }

  keys(e: IpcMainEvent, id: string) {
    this._clients[id].keys('*', (err, v) => {
      if (err) throw err;

      const keys = { };

      for (const key of v) {
        keys[key] = undefined;
      }

      e.sender.send('redis:key-value:keys.return', {
        id,
        keys,
      });
    });
  }

  keyValueSet(e: IpcMainEvent, v: dtos.IRedisKeyValueSetRequest) {
    this._clients[v.id].set(v.key, jsonTryStringify(v.value) || v.value, (err) => {
      if (err) throw err;

      e.sender.send('redis:key-value:set.return', v);
    });
  }

  keyValueRemove(e: IpcMainEvent, v: dtos.IRedisKeyValueDeleteRequest) {
    this._clients[v.id].del(v.key, (err) => {
      if (err) throw err;

      e.sender.send('redis:key-value:delete.return', v);
    });
  }

  private _onConnect(e: IpcMainEvent, id: string) {
    e.sender.send('redis:clients:status', {
      id,
      status: 'open',
    });
  }

  private _onReconnect(e: IpcMainEvent, id: string) {
    e.sender.send('redis:clients:status', {
      id,
      status: 'reconnecting',
    });
  }

  private _onEnd(e: IpcMainEvent, id: string) {
    e.sender.send('redis:clients:status', {
      id,
      status: 'closed',
    });
  }

  private _onError(e: IpcMainEvent, id: string, err: any) {
    e.sender.send('redis:clients:error', {
      id,
      err,
    });
  }
}

export default new Redis();
