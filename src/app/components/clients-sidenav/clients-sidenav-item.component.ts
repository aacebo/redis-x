import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { IClient } from '../../stores/clients';

@Component({
  selector: 'rdx-clients-sidenav-item',
  templateUrl: './clients-sidenav-item.component.html',
  styleUrls: ['./clients-sidenav-item.component.scss'],
  host: { '[class.active]': 'active === client.id' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsSidenavItemComponent {
  @Input() active: string;
  @Input() client: IClient;
}
