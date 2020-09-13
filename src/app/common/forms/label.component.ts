import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'label[rdx-label]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./label.component.scss'],
  host: {
    class: 'rdx-label',
    '[for]': 'for',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  @Input('rdx-label') for?: string;
}
