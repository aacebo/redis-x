import { Component, ChangeDetectionStrategy } from '@angular/core';

import { SystemService } from './stores/system';
import { InfoService } from './stores/info';
import { KeysService } from './stores/keys';
import { SearchService } from './stores/search';

import { RouterService } from './router';
import { ISidenavItem } from './components/sidenav';

@Component({
  selector: 'rdx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly sidenavItems: ISidenavItem[] = [
    { icon: 'database', route: '/clients', text: 'Connections' },
  ];

  constructor(
    readonly systemService: SystemService,
    readonly infoService: InfoService,
    readonly router: RouterService,
    private readonly _searchService: SearchService,
    private readonly _keysService: KeysService,
  ) { }

  onRefresh() {
    this._keysService.getAll(this.router.clientId);
  }

  onSearch() {
    this._searchService.toggleVisible();
  }
}
