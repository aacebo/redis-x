import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as dtos from '../../../electron/dtos/redis';
import { ApiService } from '../../api';
import { IStore } from '../store.interface';

import { IInfoState } from './info-state.interface';

@Injectable({
  providedIn: 'root',
})
export class InfoService implements IStore<IInfoState> {
  get state$() { return this._state$.asObservable(); }
  private readonly _state$ = new BehaviorSubject<IInfoState>({ });

  constructor(private readonly _api: ApiService) {
    this._api.on<dtos.IRedisInfoResponse>('redis:info.return', (_, res) => {
      this._state$.next({
        ...this._state$.value,
        [res.id]: res.info,
      });
    });
  }

  remove(clientId: string) {
    const state = this._state$.value;
    delete state[clientId];
    this._state$.next(state);
  }
}
