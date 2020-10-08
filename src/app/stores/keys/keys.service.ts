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
    this._api.on<dtos.IKeyValueKeysResponse>('redis:key-value:keys.return', (_, keys) => {
      this._state$.next({
        ...this._state$.value,
        [keys.id]: keys.keys,
      });
    });
  }

  getClientKeys(clientId: string) {
    return this._state$.value[clientId];
  }

  remove(clientId: string) {
    const state = this._state$.value;
    delete state[clientId];
    this._state$.next(state);
  }

  keys(v: dtos.IKeyValueKeysRequest) {
    this._api.send('redis:key-value:keys', v);
  }

  get(v: dtos.IKeyValueGetRequest) {
    this._api.once<dtos.IKeyValueGetResponse>('redis:key-value:get.return', (_, res) => {
      this._setKeyValue(res.id, res.key, res.value);
    });

    this._api.send('redis:key-value:get', v);
  }

  set(v: dtos.IKeyValueSetRequest) {
    this._api.once<dtos.IKeyValueSetRequest>('redis:key-value:set.return', (_, res) => {
      this._setKeyValue(res.id, res.key, res.value);
      this._toastr.success('Updated Key/Value');
    });

    this._api.send('redis:key-value:set', v);
  }

  delete(v: dtos.IKeyValueDeleteRequest) {
    this._api.once<dtos.IKeyValueDeleteRequest>('redis:key-value:delete.return', (_, res) => {
      this._removeKeyValue(res.id, res.key);
      this._toastr.success('Deleted Key/Value');
    });

    this._api.send('redis:key-value:delete', v);
  }

  flushAll(v: dtos.IKeyValueFlushAllRequest) {
    this._api.once<dtos.IKeyValueFlushAllResponse>('redis:key-value:flush-all.return', (_, res) => {
      this.remove(res.id);
    });

    this._api.send('redis:key-value:flush-all', v);
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
