import { Component, ChangeDetectionStrategy } from '@angular/core';

import { SystemService } from './stores/system';
import { InfoService } from './stores/info';
import { KeysService } from './stores/keys';
import { SearchService } from './stores/search';

import { RouterService } from './router';
import { ISidenavItem } from './components/sidenav';

import { AppService } from './app.service';

@Component({
  selector: 'rdx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly sidenavItems: ISidenavItem[] = [
    { type: 'link', icon: 'database', route: '/clients', text: 'Connections' },
    { type: 'button', icon: 'search', text: 'Search', click: this._onSearch.bind(this) },
    { type: 'spacer' },
    { type: 'button', icon: 'arrow-left', text: 'Collapse', click: this._onSubMenuToggle.bind(this) },
  ];

  constructor(
    readonly appService: AppService,
    readonly systemService: SystemService,
    readonly infoService: InfoService,
    readonly router: RouterService,
    private readonly _searchService: SearchService,
    private readonly _keysService: KeysService,
  ) { }

  onRefresh() {
    this._keysService.getAll(this.router.clientId);
  }

  private _onSearch() {
    this._searchService.toggleVisible();
  }

  private _onSubMenuToggle() {
    this.appService.subMenuClosed = !this.appService.subMenuClosed;
    this.sidenavItems.splice(3, 1, {
      ...this.sidenavItems[3],
      icon: this.appService.subMenuClosed ? 'arrow-right' : 'arrow-left',
      text: this.appService.subMenuClosed ? 'Expand' : 'Collapse',
    });
  }
}
