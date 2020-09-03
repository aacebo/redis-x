import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { IRedisClient } from '../../stores/redis';

@Component({
  selector: 'rdx-clients-sidenav',
  templateUrl: './clients-sidenav.component.html',
  styleUrls: ['./clients-sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsSidenavComponent {
  @Input() clients: IRedisClient[] = [];

  @Output() create = new EventEmitter<void>();
}
