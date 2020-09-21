import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';

const BUTTON_HOST_ATTRIBUTES = [
  'rdx-button',
  'rdx-outline-button',
  'rdx-icon-button',
];

@Component({
  selector: `button[rdx-button], a[rdx-button],
             button[rdx-outline-button], a[rdx-outline-button],
             button[rdx-icon-button], a[rdx-icon-button]`,
  template: `<ng-content></ng-content>`,
  styleUrls: ['./button.component.scss'],
  host: {
    class: 'rdx-button btn',
    '[class.btn-sm]': 'size === "sm"',
    '[class.btn-lg]': 'size === "lg"',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() size?: 'sm' | 'lg';

  @Input()
  get appearance() { return this._appearance; }
  set appearance(v) {
    if (this._appearance && this._el) {
      this._el.nativeElement.classList.remove(`btn${this.outline ? '-outline' : ''}-${this._appearance}`);
    }

    if (v && this._el) {
      this._el.nativeElement.classList.add(`btn${this.outline ? '-outline' : ''}-${v}`);
    }

    this._appearance = v;
  }
  private _appearance: 'primary' | 'secondary' | 'success' |
                       'danger' | 'warning' | 'info' |
                       'light' | 'dark' | 'link';

  private get outline() {
    return this._el.nativeElement.hasAttribute('rdx-outline-button');
  }

  constructor(private readonly _el: ElementRef<HTMLButtonElement>) {
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._el.nativeElement.hasAttribute(attr)) {
        this._el.nativeElement.classList.add(attr);
      }
    }
  }
}
