import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IStore } from '../store.interface';
import { ISystem } from './system.interface';

@Injectable({
  providedIn: 'root',
})
export class SystemService implements IStore<ISystem> {
  get state$() { return this._state$.asObservable(); }
  private readonly _state$ = new BehaviorSubject<ISystem>(undefined);

  set(v: ISystem) {
    this._state$.next(v);
  }
}
