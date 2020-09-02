import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { ApiService } from './api';
import { SystemService } from './stores/system';
import { ISidenavItem } from './components/sidenav';

@Component({
  selector: 'rdx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly sidenavItems: ISidenavItem[] = [
    { icon: 'database', route: '/clients', text: 'Connections' },
  ];

  constructor(
    private readonly _apiService: ApiService,
    private readonly _systemService: SystemService,
  ) { }

  ngOnInit() {
    this._apiService.once('system', (_, v) => {
      this._systemService.set(v);
    });
  }
}
