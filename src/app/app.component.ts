import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { SystemService } from './stores/system';
import { InfoService } from './stores/info';
import { KeysService } from './stores/keys';
import { SearchService } from './stores/search';
import { ClientsService } from './stores/clients';

import { ISidenavItem } from './components/sidenav';
import { AboutDialogService } from './components/about-dialog';
import { ConfirmDialogService } from './components/confirm-dialog';

import { ApiService } from './api';
import { RouterService } from './router';

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
    private readonly _api: ApiService,
    private readonly _searchService: SearchService,
    private readonly _keysService: KeysService,
    private readonly _aboutDialogService: AboutDialogService,
    private readonly _confirmDialogService: ConfirmDialogService,
  ) { }

  ngOnInit() {
    this.clientsService.findAll();
    this.systemService.checkForUpdate();

    this._api.on('menu:about.return', () => {
      this._aboutDialogService.open();
    });
  }

  onRefresh(id: string) {
    this._keysService.keys({ id });
  }

  onFlushAll(id: string) {
    this._confirmDialogService.open('are you sure you want to remove all key/value data?').result.then(confirmed => {
      if (confirmed) {
        this._keysService.flushAll({ id });
      }
    }).catch(() => undefined);
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
