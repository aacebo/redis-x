import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { SystemService } from './stores/system';
import { InfoService } from './stores/info';
import { KeysService } from './stores/keys';
import { SearchService } from './stores/search';
import { ClientsService } from './stores/clients';
import { UpdateService } from './stores/update';

import { RouterService } from './router';
import { ISidenavItem } from './components/sidenav';

import { AppService } from './app.service';

@Component({
  selector: 'rdx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly sidenavItems: ISidenavItem[] = [
    { type: 'link', icon: 'database', route: '/clients', text: 'Connections' },
    { type: 'button', icon: 'search', text: 'Search', click: this._onSearch.bind(this) },
    { type: 'spacer' },
    { type: 'button', icon: 'chevron-left', text: 'Collapse', click: this._onSubMenuToggle.bind(this) },
  ];

  constructor(
    readonly appService: AppService,
    readonly systemService: SystemService,
    readonly infoService: InfoService,
    readonly clientsService: ClientsService,
    readonly router: RouterService,
    private readonly _updateService: UpdateService,
    private readonly _searchService: SearchService,
    private readonly _keysService: KeysService,
  ) { }

  ngOnInit() {
    this.clientsService.findAll();
    this._updateService.check();
  }

  onRefresh() {
    this._keysService.keys({ id: this.router.clientId });
  }

  private _onSearch() {
    this._searchService.toggleVisible();
  }

  private _onSubMenuToggle() {
    this.appService.subMenuClosed = !this.appService.subMenuClosed;
    this.sidenavItems.splice(3, 1, {
      ...this.sidenavItems[3],
      icon: this.appService.subMenuClosed ? 'chevron-right' : 'chevron-left',
      text: this.appService.subMenuClosed ? 'Expand' : 'Collapse',
    });
  }
}
