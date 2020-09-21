import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rdx-error',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./error.component.scss'],
  host: { class: 'rdx-error invalid-feedback' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent { }
