import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  get subMenuClosed$() { return this._subMenuClosed$.asObservable(); }
  get subMenuClosed() { return this._subMenuClosed$.value; }
  set subMenuClosed(v) { this._subMenuClosed$.next(v); }
  private readonly _subMenuClosed$ = new BehaviorSubject(false);
}
