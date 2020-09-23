import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { IClient } from '../../stores/clients';

@Component({
  selector: 'rdx-clients-sidenav-item',
  templateUrl: './clients-sidenav-item.component.html',
  styleUrls: ['./clients-sidenav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsSidenavItemComponent {
  @Input() client: IClient;
}
