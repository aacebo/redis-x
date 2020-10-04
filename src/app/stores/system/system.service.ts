import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '../../api';
import { IStore } from '../store.interface';

import { ISystem } from './system.interface';

@Injectable({
  providedIn: 'root',
})
export class SystemService implements IStore<ISystem> {
  get fullscreen$() { return this.state$.pipe(map(s => s?.fullscreen)); }

  get state$() { return this._state$.asObservable(); }
  private readonly _state$ = new BehaviorSubject<ISystem>(undefined);

  constructor(private readonly _api: ApiService) {
    this._api.on('system', (_, v) => {
      this._state$.next(v);
    });
  }
}
