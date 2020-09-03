import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICreateRedis, IStatusRedis, IKeysRedis } from '../../../electron/dtos/redis';
import { ApiService } from '../../api';

import { IStore } from '../store.interface';
import { IRedisState } from './redis-state.interface';
import { IRedisClient } from './redis-client.interface';

@Injectable({
  providedIn: 'root',
})
export class RedisService implements IStore<IRedisState> {
  get active$() { return this._state$.pipe(map(v => v.active)); }
  get clients$() { return this.state$.pipe(map(v => Object.values(v.clients))); }

  get state$() { return this._state$.asObservable(); }
  private readonly _state$ = new BehaviorSubject<IRedisState>({ clients: { } });

  constructor(private readonly _apiService: ApiService) {
    this._apiService.on<IStatusRedis>('redis:status', (_, status) => {
      this._setClientProp(status.id, 'status', status.status);
    });

    this._apiService.on<IKeysRedis>('redis:keys.return', (_, keys) => {
      this._setClientProp(keys.id, 'keys', keys.keys);
    });
  }

  create(v: ICreateRedis) {
    this._apiService.once<IRedisClient>('redis:create.return', (_, client) => {
      this._setClient(client.id, client);
      this._setActive(client.id);
    });

    this._apiService.send('redis:create', v);
  }

  close(id: string) {
    this._apiService.send('redis:close', id);
  }

  private _setClient(id: string, v: IRedisClient) {
    this._state$.next({
      ...this._state$.value,
      clients: {
        [id]: { ...v },
      },
    });
  }

  private _setClientProp<T extends IRedisClient, P extends keyof T, V = T[P]>(id: string, p: P, v: V) {
    const client = this._state$.value.clients[id];
    this._state$.next({
      ...this._state$.value,
      clients: {
        [id]: {
          ...client,
          [p]: v,
        },
      },
    });
  }

  private _setActive(active: string) {
    this._state$.next({
      ...this._state$.value,
      active,
    });
  }
}
