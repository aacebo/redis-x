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
    this._api.on<dtos.IClientStatusResponse>('redis:client:status', (_, res) => {
      this._setClientProp(res.id, 'status', res.status);

      if (res.status === 'open') {
        const client = this._state$.value[res.id];
        this._toastr.info(`Connected to ${client.host}:${client.port}`);
      }
    });

    this._api.on<dtos.IClientErrorResponse>('redis:client:error', (_, res) => {
      this._toastr.error(res.err?.message || 'an error has occurred');
    });
  }

  findAll() {
    this._api.once<dtos.IClientFindAllResponse>('redis:client:findAll.return', (_, res) => {
      const clients = { };

      for (const client of res.clients) {
        clients[client.id] = client;
      }

      this._state$.next(clients);
    });

    this._api.send('redis:client:findAll');
  }

  create(v: dtos.IClientCreateRequest) {
    this._api.once<dtos.IClientCreateResponse>('redis:client:create.return', (_, res) => {
      this._setClient(res.id, res);
      this._router.navigate(['clients', res.id]);
    });

    this._api.send('redis:client:create', v);
  }

  update(v: dtos.IClientUpdateRequest) {
    this._api.once<dtos.IClientUpdateResponse>('redis:client:update.return', (_, res) => {
      this._setClient(res.id, res);
    });

    this._api.send('redis:client:update', v);
  }

  connect(v: dtos.IClientConnectRequest) {
    this._api.send('redis:client:connect', v);
  }

  remove(v: dtos.IClientRemoveRequest) {
    const clients = this._state$.value;
    delete clients[v.id];

    if (v.id === this._router.clientId) {
      this._router.navigate(['clients']);
    }

    this._state$.next({ ...clients });
    this._api.send('redis:client:remove', v);
  }

  close(v: dtos.IClientCloseRequest) {
    this._api.send('redis:client:close', v);
  }

  test(v: dtos.IClientTestRequest, cb: (success: boolean) => void) {
    this._api.once<dtos.IClientTestResponse>('redis:client:test.return', (_, res) => {
      cb(res.success);
    });

    this._api.send('redis:client:test', v);
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
