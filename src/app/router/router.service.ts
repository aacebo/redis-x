import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  get clientId() { return this.route?.snapshot.paramMap.get('id'); }
  readonly clientId$: Observable<string>;

  get route() {
    return this._activatedRoute.root?.firstChild?.firstChild?.firstChild;
  }

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
  ) {
    this.clientId$ = this._router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      switchMap(() =>
        this.route?.paramMap.pipe(map(v => v.get('id'))) || Promise.resolve(undefined),
      ),
    );
  }

  navigate(commands: any[], extras?: NavigationExtras) {
    return this._router.navigate(commands, extras);
  }
}
