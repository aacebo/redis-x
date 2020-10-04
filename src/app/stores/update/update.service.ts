import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import * as dtos from '../../../electron/dtos/updater';

import { ApiService } from '../../api';
import { IStore } from '../store.interface';

import { IUpdateState } from './update-state.interface';

@Injectable({
  providedIn: 'root',
})
export class UpdateService implements IStore<IUpdateState> {
  get available$() { return this.state$.pipe(map(s => s?.available)); }

  get state$() { return this._state$.asObservable(); }
  private readonly _state$ = new BehaviorSubject<IUpdateState>({ });

  constructor(private readonly _api: ApiService) { }

  check() {
    this._api.once<dtos.IUpdaterCheckResponse>('updater:check.return', (_, res) => {
      this._state$.next({
        ...this._state$.value,
        available: res.available,
      });
    });

    this._api.send('updater:check');
  }
}
