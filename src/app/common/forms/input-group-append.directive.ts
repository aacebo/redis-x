import { Directive } from '@angular/core';

@Directive({
  selector: '[rdxInputGroupAppend]',
  host: { class: 'rdx-input-group-append input-group-append' },
})
export class InputGroupAppendDirective { }
