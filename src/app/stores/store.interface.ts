import { Observable } from 'rxjs';

export interface IStore<T = any> {
  readonly value$: Observable<T>;
  set(v: T): void;
}
