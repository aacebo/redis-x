import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { SystemService } from './stores/system';
import { InfoService } from './stores/info';
import { KeysService } from './stores/keys';
import { SearchService } from './stores/search';

import { ISidenavItem } from './components/sidenav';

@Component({
  selector: 'rdx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly id$: Observable<string>;
  readonly sidenavItems: ISidenavItem[] = [
    { icon: 'database', route: '/clients', text: 'Connections' },
  ];

  private get _activeRoute() {
    return this._route.root?.firstChild?.firstChild?.firstChild;
  }

  constructor(
    readonly systemService: SystemService,
    readonly infoService: InfoService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _searchService: SearchService,
    private readonly _keysService: KeysService,
  ) {
    this.id$ = this._router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      switchMap(() =>
        this._activeRoute?.paramMap.pipe(map(v => v.get('id'))) || Promise.resolve(undefined),
      ),
    );
  }

  onRefresh() {
    this._keysService.getAll(this._activeRoute?.snapshot.paramMap.get('id'));
  }

  onSearch() {
    this._searchService.toggleVisible();
  }
}
