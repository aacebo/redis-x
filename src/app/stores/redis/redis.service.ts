import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import * as dtos from '../../../electron/dtos/redis';
import { ApiService } from '../../api';
import { IStore } from '../store.interface';

import { IRedisState } from './redis-state.interface';
import { IRedisClient } from './redis-client.interface';

@Injectable({
  providedIn: 'root',
})
export class RedisService implements IStore<IRedisState> {
  get active$() { return this.state$.pipe(map(v => v.active)); }
  get clients$() { return this.state$.pipe(map(v => Object.values(v.clients))); }
  get activeClient$() { return this.state$.pipe(map(v => v.clients[v.active])); }

  get state$() { return this._state$.asObservable(); }
  private readonly _state$ = new BehaviorSubject<IRedisState>({ clients: { } });

  constructor(
    private readonly _apiService: ApiService,
    private readonly _toastr: ToastrService,
  ) {
    this._apiService.on<dtos.IRedisStatusResponse>('redis:status', (_, status) => {
      this._setClientProp(status.id, 'status', status.status);

      if (status.status === 'open') {
        this._toastr.info(`Connected to ${this._state$.value.clients[status.id].host}`);
      }
    });

    this._apiService.on<dtos.IRedisKeysResponse>('redis:keys.return', (_, keys) => {
      this._setClientProp(keys.id, 'map', keys.keys);
    });

    this._apiService.on<dtos.IRedisErrorResponse>('redis:error', (_, error) => {
      this._toastr.error(error.err?.message || 'an error has occurred');
    });
  }

  getStateProp<P extends keyof IRedisState, R = IRedisState[P]>(prop: P): R {
    return this._state$.value[prop as any];
  }

  create(v: dtos.IRedisCreateRequest) {
    this._apiService.once<IRedisClient>('redis:create.return', (_, client) => {
      this._setClient(client.id, client);
      this._setActive(client.id);
    });

    this._apiService.send('redis:create', v);
  }

  activate(id: string) {
    this._setActive(id);
  }

  remove(id: string) {
    const clients = this._state$.value.clients;
    delete clients[id];

    if (id === this._state$.value.active) {
      this._setActive(undefined);
    }

    this._state$.next({
      ...this._state$.value,
      clients,
    });

    this._apiService.send('redis:remove', id);
  }

  key(key: string) {
    this._apiService.once('redis:key.return', (_, v) => {
      this._setKeyValue(this._state$.value.active, key, v);
    });

    this._apiService.send('redis:key', {
      id: this._state$.value.active,
      key,
    });
  }

  keyValueSet(v: dtos.IRedisKeyValueSetRequest) {
    this._apiService.once<dtos.IRedisKeyValueSetRequest>('redis:key-value-set.return', (_, res) => {
      this._setKeyValue(res.id, res.key, res.value);
      this._toastr.success('Updated Key/Value');
    });

    this._apiService.send('redis:key-value-set', v);
  }

  close(id: string) {
    this._apiService.send('redis:close', id);
  }

  private _setClient(id: string, v: IRedisClient) {
    this._state$.next({
      ...this._state$.value,
      clients: {
        ...this._state$.value.clients,
        [id]: { ...v },
      },
    });
  }

  private _setClientProp<T extends IRedisClient, P extends keyof T, V = T[P]>(id: string, p: P, v: V) {
    const client = this._state$.value.clients[id];

    if (client) {
      this._state$.next({
        ...this._state$.value,
        clients: {
          ...this._state$.value.clients,
          [id]: {
            ...client,
            [p]: v,
          },
        },
      });
    }
  }

  private _setActive(active: string) {
    this._state$.next({
      ...this._state$.value,
      active,
    });
  }

  private _setKeyValue<V = any>(id: string, key: string, v: V) {
    const client = this._state$.value.clients[id];

    this._state$.next({
      ...this._state$.value,
      clients: {
        ...this._state$.value.clients,
        [id]: {
          ...client,
          map: {
            ...client.map,
            [key]: v,
          },
        },
      },
    });
  }
}
