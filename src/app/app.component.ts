import { Component, ChangeDetectionStrategy } from '@angular/core';

import { SystemService } from './stores/system';
import { ClientsService } from './stores/clients';
import { InfoService } from './stores/info';

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
    readonly clientsService: ClientsService,
    readonly infoService: InfoService,
  ) { }
}
