import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Component({
  selector: 'input[rdx-form-control], select[rdx-form-control], textarea[rdx-form-control]',
  template: '',
  styleUrls: ['./form-control.component.scss'],
  host: {
    class: 'rdx-form-control form-control',
    '[class.is-invalid]': 'formControlName?.dirty && formControlName?.invalid',
    '[class.form-control-sm]': 'size === "sm"',
    '[class.form-control-lg]': 'size === "lg"',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlComponent {
  @Input() size?: 'sm' | 'lg';

  constructor(readonly formControlName: FormControlName) { }
}
