import { Observable } from 'rxjs';

export interface IStore<T = any> {
  readonly state$: Observable<T>;
}
