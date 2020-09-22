import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'input[rdxAutofocus], textarea[rdxAutofocus]',
  host: { class: 'rdx-autofocus' },
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private readonly _el: ElementRef<HTMLInputElement | HTMLTextAreaElement>) { }

  ngAfterViewInit() {
    this._el.nativeElement.focus();
  }
}
