import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { IClient } from '../../stores/clients';

@Component({
  selector: 'rdx-clients-sidenav-item',
  templateUrl: './clients-sidenav-item.component.html',
  styleUrls: ['./clients-sidenav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsSidenavItemComponent {
  @Input() client: IClient;

  @Output() remove = new EventEmitter<string>();
  @Output() connect = new EventEmitter<IClient>();
  @Output() disconnect = new EventEmitter<string>();
  @Output() edit = new EventEmitter<IClient>();

  onConnect() {
    if (this.client.status === 'open') {
      this.disconnect.emit(this.client.id);
    } else {
      this.connect.emit(this.client);
    }
  }
}
