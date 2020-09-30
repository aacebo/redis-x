import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { IClient } from '../../stores/clients';

@Component({
  selector: 'rdx-clients-sidenav',
  templateUrl: './clients-sidenav.component.html',
  styleUrls: ['./clients-sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsSidenavComponent {
  @Input() clients: IClient[] = [];

  @Input()
  get closed() { return this._closed; }
  set closed(v) {
    this._closed = coerceBooleanProperty(v);
  }
  private _closed?: boolean;

  @Output() create = new EventEmitter<void>();
  @Output() remove = new EventEmitter<string>();
  @Output() connect = new EventEmitter<IClient>();
  @Output() disconnect = new EventEmitter<string>();
  @Output() edit = new EventEmitter<IClient>();
}
