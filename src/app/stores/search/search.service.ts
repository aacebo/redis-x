import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { IStore } from '../store.interface';

import { ISearchState } from './search-state.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService implements IStore<ISearchState> {
  get text$() { return this._state$.pipe(map(s => s.text)); }
  get visible$() { return this._state$.pipe(map(s => s.visible)); }

  get state$() { return this._state$.asObservable(); }
  private readonly _state$ = new BehaviorSubject<ISearchState>({ });

  setText(text: string) {
    this._state$.next({
      ...this._state$.value,
      text,
    });
  }

  toggleVisible() {
    this._state$.next({
      ...this._state$.value,
      visible: !this._state$.value.visible,
    });
  }
}
