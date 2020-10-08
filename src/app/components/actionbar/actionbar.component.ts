import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { IInfo } from '../../stores/info';

@Component({
  selector: 'rdx-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionbarComponent {
  @Input() active: string;
  @Input() info: { [clientId: string]: IInfo; } = { };

  @Output() add = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<string>();
  @Output() flushAll = new EventEmitter<string>();
}
