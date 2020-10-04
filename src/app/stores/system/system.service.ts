import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ISystem } from '../../../electron/models';
import * as dtos from '../../../electron/dtos/updater';

import { ApiService } from '../../api';
import { IStore } from '../store.interface';

import { ISystemState } from './system-state.interface';

@Injectable({
  providedIn: 'root',
})
export class SystemService implements IStore<ISystemState> {
  get system$() { return this._state$.pipe(map(s => s.system)); }
  get fullscreen$() { return this._state$.pipe(map(s => s.system?.fullscreen)); }
  get updateAvailable$() { return this._state$.pipe(map(s => s.updateAvailable)); }

  get state$() { return this._state$.asObservable(); }
  private readonly _state$ = new BehaviorSubject<ISystemState>({ });

  constructor(private readonly _api: ApiService) {
    this._api.on<ISystem>('system.return', (_, system) => {
      this._state$.next({
        ...this._state$.value,
        system,
      });
    });
  }

  checkForUpdate() {
    this._api.once<dtos.IUpdaterCheckResponse>('updater:check.return', (_, res) => {
      this._state$.next({
        ...this._state$.value,
        updateAvailable: res.available,
      });
    });

    this._api.send('updater:check');
  }
}
