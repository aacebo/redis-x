import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'rdx-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionbarComponent {
  @Input() keys: number;
}
