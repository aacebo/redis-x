import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'rdx-breadcrumb',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./breadcrumb.component.scss'],
  host: {
    class: 'rdx-breadcrumb breadcrumb-item',
    '[class.active]': 'active',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  @Input()
  get active() { return this._active; }
  set active(v) {
    this._active = coerceBooleanProperty(v);
  }
  private _active?: boolean;
}
