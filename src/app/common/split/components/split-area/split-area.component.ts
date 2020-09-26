import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  moduleId: module.id,
  exportAs: 'rdxSplitArea',
  selector: 'rdx-split-area',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./split-area.component.scss'],
  host: { class: 'rdx-split-area' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SplitAreaComponent {
  get flex() { return this._flex; }
  set flex(v) {
    if (v !== this._flex) {
      this._flex = v;
      this.el.nativeElement.style.flex = v;
    }
  }
  private _flex?: string;

  get index() { return this._index; }
  set index(v) {
    if (v !== this._index) {
      this._index = coerceNumberProperty(v);
      this.el.nativeElement.style.order = `${v}`;
    }
  }
  private _index?: number;

  get clientWidth() {
    return this.el.nativeElement.clientWidth;
  }

  get clientHeight() {
    return this.el.nativeElement.clientHeight;
  }

  constructor(
    readonly cdr: ChangeDetectorRef,
    readonly el: ElementRef<HTMLElement>,
  ) { }
}
