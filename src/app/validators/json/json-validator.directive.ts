import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

import { jsonValid } from '../../../electron/utils';

@Directive({
  selector: '[rdxJson]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: JsonValidatorDirective,
    multi: true,
  }],
})
export class JsonValidatorDirective implements Validator {
  validate(c: AbstractControl) {
    if (c.dirty) {
      if (!jsonValid(c.value)) {
        return { json: 'please enter valid json' };
      }
    }
  }
}
