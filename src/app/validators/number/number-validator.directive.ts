import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  selector: 'input[rdxNumber]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NumberValidatorDirective,
    multi: true,
  }],
})
export class NumberValidatorDirective implements Validator {
  @Input('rdxNumber')
  get enabled() { return this._enabled; }
  set enabled(v) {
    this._enabled = coerceBooleanProperty(v);
  }
  private _enabled = true;

  validate(c: AbstractControl) {
    if (this._enabled) {
      const matches = `${c.value}`.match(/^[0-9]*$/gm);

      if (!matches?.length) {
        return { number: 'please enter a valid number' };
      }
    }
  }
}
