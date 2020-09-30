import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import * as dtos from '../../../electron/dtos/redis';
import { ApiService } from '../../api';
import { RouterService } from '../../router';
import { IStore } from '../store.interface';

import { IClientsState } from './clients-state.interface';
import { IClient } from './client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientsService implements IStore<IClientsState> {
  get clients$() { return this._state$.pipe(map(s => Object.values(s))); }

  get state$() { return this._state$.asObservable(); }
  private readonly _state$ = new BehaviorSubject<IClientsState>({ });

  constructor(
    private readonly _router: RouterService,
    private readonly _api: ApiService,
    private readonly _toastr: ToastrService,
  ) {
    this._api.on<dtos.IRedisStatusResponse>('redis:clients:status', (_, status) => {
      this._setClientProp(status.id, 'status', status.status);

      if (status.status === 'open') {
        this._toastr.info(`Connected to ${this._state$.value[status.id].host}`);
      }
    });

    this._api.on<dtos.IRedisErrorResponse>('redis:clients:error', (_, error) => {
      this._toastr.error(error.err?.message || 'an error has occurred');
    });
  }

  findAll() {
    this._api.once<dtos.IRedisFindAllResponse>('redis:clients:findAll.return', (_, res) => {
      const clients = { };

      for (const client of res.clients) {
        clients[client.id] = client;
      }

      this._state$.next(clients);
    });

    this._api.send('redis:clients:findAll');
  }

  create(v: dtos.IRedisCreateRequest) {
    this._api.once<IClient>('redis:clients:create.return', (_, client) => {
      this._setClient(client.id, client);
      this._router.navigate(['clients', client.id]);
    });

    this._api.send('redis:clients:create', v);
  }

  update(v: dtos.IRedisUpdateRequest) {
    this._setClient(v.id, {
      ...this._state$.value[v.id],
      ...v,
    });

    this._api.send('redis:clients:update', v);
  }

  connect(v: dtos.IRedisConnectRequest) {
    this._api.send('redis:clients:connect', v);
  }

  remove(id: string) {
    const clients = this._state$.value;
    delete clients[id];

    if (id === this._router.clientId) {
      this._router.navigate(['clients']);
    }

    this._state$.next({ ...clients });
    this._api.send('redis:clients:remove', id);
  }

  close(id: string) {
    this._api.send('redis:clients:close', id);
  }

  private _setClient(id: string, v: IClient) {
    this._state$.next({
      ...this._state$.value,
      [id]: { ...v },
    });
  }

  private _setClientProp<T extends IClient, P extends keyof T, V = T[P]>(id: string, p: P, v: V) {
    const client = this._state$.value[id];

    if (client) {
      this._state$.next({
        ...this._state$.value,
        [id]: {
          ...client,
          [p]: v,
        },
      });
    }
  }
}
