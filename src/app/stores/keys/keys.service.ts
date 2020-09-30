import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import * as dtos from '../../../electron/dtos/redis';
import { ApiService } from '../../api';
import { IStore } from '../store.interface';

import { IKeysState } from './keys-state.interface';

@Injectable({
  providedIn: 'root',
})
export class KeysService implements IStore<IKeysState> {
  get state$() { return this._state$.asObservable(); }
  private readonly _state$ = new BehaviorSubject<IKeysState>({ });

  constructor(
    private readonly _api: ApiService,
    private readonly _toastr: ToastrService,
  ) {
    this._api.on<dtos.IRedisKeysResponse>('redis:key-value:keys.return', (_, keys) => {
      this._state$.next({
        ...this._state$.value,
        [keys.id]: keys.keys,
      });
    });
  }

  getClientKeys(clientId: string) {
    return this._state$.value[clientId];
  }

  get(clientId: string, key: string) {
    this._api.once('redis:key-value:key.return', (_, v) => {
      this._setKeyValue(clientId, key, v);
    });

    this._api.send('redis:key-value:key', {
      id: clientId,
      key,
    });
  }

  getAll(clientId: string) {
    this._api.send('redis:key-value:keys', clientId);
  }

  set(v: dtos.IRedisKeyValueSetRequest) {
    this._api.once<dtos.IRedisKeyValueSetRequest>('redis:key-value:set.return', (_, res) => {
      this._setKeyValue(res.id, res.key, res.value);
      this._toastr.success('Updated Key/Value');
    });

    this._api.send('redis:key-value:set', v);
  }

  delete(v: dtos.IRedisKeyValueDeleteRequest) {
    this._api.once<dtos.IRedisKeyValueDeleteRequest>('redis:key-value:delete.return', (_, res) => {
      this._removeKeyValue(res.id, res.key);
      this._toastr.success('Deleted Key/Value');
    });

    this._api.send('redis:key-value:delete', v);
  }

  remove(clientId: string) {
    const state = this._state$.value;
    delete state[clientId];
    this._state$.next(state);
  }

  private _setKeyValue<V = any>(clientId: string, key: string, v: V) {
    const value = this._state$.value[clientId];

    this._state$.next({
      ...this._state$.value,
      [clientId]: {
        ...value,
        [key]: v,
      },
    });
  }

  private _removeKeyValue(clientId: string, key: string) {
    const value = this._state$.value[clientId];
    delete value[key];

    this._state$.next({
      ...this._state$.value,
      [clientId]: {
        ...value,
      },
    });
  }
}
