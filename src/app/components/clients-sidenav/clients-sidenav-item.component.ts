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

  onConnect(e: Event) {
    e.stopImmediatePropagation();
    e.preventDefault();

    if (this.client.status !== 'closed') {
      this.disconnect.emit(this.client.id);
    } else {
      this.connect.emit(this.client);
    }
  }

  onEdit(e: Event) {
    e.stopImmediatePropagation();
    e.preventDefault();

    this.edit.emit(this.client);
  }

  onRemove(e: Event) {
    e.stopImmediatePropagation();
    e.preventDefault();

    this.remove.emit(this.client.id);
  }
}
