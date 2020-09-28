import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rdx-input-group',
  template: `<ng-content></ng-content>`,
  host: { class: 'rdx-input-group input-group' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupComponent { }
