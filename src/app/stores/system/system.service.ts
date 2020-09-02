import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IStore } from '../store.interface';
import { ISystem } from './system.interface';

@Injectable({
  providedIn: 'root',
})
export class SystemService implements IStore<ISystem> {
  get value$() { return this._value$.asObservable(); }
  private readonly _value$ = new BehaviorSubject<ISystem>(undefined);

  set(v: ISystem) {
    this._value$.next(v);
  }
}
