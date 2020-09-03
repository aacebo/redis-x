import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { IRedisClient } from '../../stores/redis';

@Component({
  selector: 'rdx-clients-sidenav-item',
  templateUrl: './clients-sidenav-item.component.html',
  styleUrls: ['./clients-sidenav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsSidenavItemComponent {
  @Input() client: IRedisClient;
}
