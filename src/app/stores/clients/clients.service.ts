import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import * as dtos from '../../../electron/dtos/redis';
import { ApiService } from '../../api';
import { IStore } from '../store.interface';

import { IClientsState } from './clients-state.interface';
import { IClient } from './client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientsService implements IStore<IClientsState> {
  get active$() { return this.state$.pipe(map(v => v.active)); }
  get clients$() { return this.state$.pipe(map(v => Object.values(v.clients))); }
  get activeClient$() { return this.state$.pipe(map(v => v.clients[v.active])); }

  get state$() { return this._state$.asObservable(); }
  private readonly _state$ = new BehaviorSubject<IClientsState>({ clients: { } });

  constructor(
    private readonly _api: ApiService,
    private readonly _toastr: ToastrService,
  ) {
    this._api.on<dtos.IRedisStatusResponse>('redis:status', (_, status) => {
      this._setClientProp(status.id, 'status', status.status);

      if (status.status === 'open') {
        this._toastr.info(`Connected to ${this._state$.value.clients[status.id].host}`);
      }
    });

    this._api.on<dtos.IRedisErrorResponse>('redis:error', (_, error) => {
      this._toastr.error(error.err?.message || 'an error has occurred');
    });
  }

  getStateProp<P extends keyof IClientsState, R = IClientsState[P]>(prop: P): R {
    return this._state$.value[prop as any];
  }

  create(v: dtos.IRedisCreateRequest) {
    this._api.once<IClient>('redis:create.return', (_, client) => {
      this._setClient(client.id, client);
      this._setActive(client.id);
    });

    this._api.send('redis:create', v);
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

    this._api.send('redis:remove', id);
  }

  close(id: string) {
    this._api.send('redis:close', id);
  }

  private _setActive(active: string) {
    this._state$.next({
      ...this._state$.value,
      active,
    });
  }

  private _setClient(id: string, v: IClient) {
    this._state$.next({
      ...this._state$.value,
      clients: {
        ...this._state$.value.clients,
        [id]: { ...v },
      },
    });
  }

  private _setClientProp<T extends IClient, P extends keyof T, V = T[P]>(id: string, p: P, v: V) {
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
}
