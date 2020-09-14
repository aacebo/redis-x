import { Directive, EventEmitter, Output } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Directive({
  selector: 'input[rdxSubmit]',
  host: {
    class: 'rdx-submit',
    '(keydown.enter)': 'onEnter()',
  },
})
export class SubmitDirective {
  @Output('rdxSubmit') submit = new EventEmitter<void>();

  constructor(private readonly _formControlName: FormControlName) { }

  onEnter() {
    if (this._formControlName.control.parent.valid) {
      this.submit.emit();
    }
  }
}
