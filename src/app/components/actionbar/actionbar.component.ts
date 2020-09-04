import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rdx-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss'],
  host: { class: 'rdx-bg-primary' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionbarComponent { }
