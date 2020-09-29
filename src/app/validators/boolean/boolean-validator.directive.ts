import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  selector: 'input[rdxBoolean], textarea[rdxBoolean]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: BooleanValidatorDirective,
    multi: true,
  }],
})
export class BooleanValidatorDirective implements Validator {
  @Input('rdxBoolean')
  get enabled() { return this._enabled; }
  set enabled(v) {
    this._enabled = coerceBooleanProperty(v);
  }
  private _enabled = true;

  validate(c: AbstractControl) {
    if (this._enabled && c?.value) {
      const v = (c.value as string).toLowerCase();

      if (v !== 'true' && v !== 'false') {
        return { number: 'please enter a valid boolean' };
      }
    }
  }
}
