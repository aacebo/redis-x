import { ipcMain, IpcMainEvent } from 'electron';
import * as redis from 'redis';
import * as uuid from 'uuid';

import * as dtos from './dtos/redis';
import { jsonTryParse, jsonTryStringify } from './utils';

class Redis {
  private readonly _clients: { [id: string]: redis.RedisClient } = { };

  constructor() {
    ipcMain.on('redis:create', this.create.bind(this));
    ipcMain.on('redis:close', this.close.bind(this));
    ipcMain.on('redis:remove', this.remove.bind(this));
    ipcMain.on('redis:key', this.key.bind(this));
    ipcMain.on('redis:keys', this.keys.bind(this));
    ipcMain.on('redis:key-value-set', this.keyValueSet.bind(this));
  }

  create(e: IpcMainEvent, v: dtos.IRedisCreateRequest) {
    const id = uuid.v1();
    this._clients[id] = redis.createClient({ ...v });

    this._clients[id].on('ready', () => this.keys(e, id));
    this._clients[id].on('connect', () => this._onConnect(e, id));
    this._clients[id].on('reconnecting', () => this._onReconnect(e, id));
    this._clients[id].on('end', () => this._onEnd(e, id));
    this._clients[id].on('error', (err) => this._onError(e, id, err));

    e.sender.send('redis:create.return', {
      id,
      status: this._clients[id].connected ? 'open' : 'reconnecting',
      ...v,
    });
  }

  key(e: IpcMainEvent, v: dtos.IRedisKeyValueRequest) {
    this._clients[v.id].get(v.key, (err, res) => {
      if (err) throw err;

      const o = jsonTryParse(res);
      e.sender.send('redis:key.return', o || res);
    });
  }

  keys(e: IpcMainEvent, id: string) {
    this._clients[id].keys('*', (err, v) => {
      if (err) throw err;

      const keys = { };

      for (const key of v) {
        keys[key] = undefined;
      }

      e.sender.send('redis:keys.return', {
        id,
        keys,
      });
    });
  }

  keyValueSet(e: IpcMainEvent, v: dtos.IRedisKeyValueSetRequest) {
    this._clients[v.id].set(v.key, jsonTryStringify(v.value) || v.value, (err) => {
      if (err) throw err;

      e.sender.send('redis:key-value-set.return', v);
    });
  }

  close(_: IpcMainEvent, id: string) {
    this._clients[id].quit();
  }

  remove(_: IpcMainEvent, id: string) {
    this._clients[id].quit();
    delete this._clients[id];
  }

  private _onConnect(e: IpcMainEvent, id: string) {
    e.sender.send('redis:status', {
      id,
      status: 'open',
    });
  }

  private _onReconnect(e: IpcMainEvent, id: string) {
    e.sender.send('redis:status', {
      id,
      status: 'reconnecting',
    });
  }

  private _onEnd(e: IpcMainEvent, id: string) {
    e.sender.send('redis:status', {
      id,
      status: 'closed',
    });
  }

  private _onError(e: IpcMainEvent, id: string, err: any) {
    e.sender.send('redis:error', {
      id,
      err,
    });
  }
}

export default new Redis();
