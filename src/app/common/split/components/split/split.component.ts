import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ElementRef,
  ContentChildren,
  QueryList,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { subscribableMixin } from '../../../core/mixins/subscribable.mixin';
import { pxToPct } from '../../../core/utils/px-to-pct/px-to-pct.util';

import { SplitAreaComponent } from '../split-area/split-area.component';

class SplitBase { }
const _SplitMixinBase = subscribableMixin(SplitBase);

@Component({
  moduleId: module.id,
  exportAs: 'rdxSplit',
  selector: 'rdx-vertical-split, rdx-horizontal-split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.scss'],
  host: { class: 'rdx-split' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SplitComponent extends _SplitMixinBase {
  @Input()
  get flex() { return this._flex; }
  set flex(v) {
    if (v !== this._flex) {
      this._flex = v;

      if (this._areas) {
        this._one.flex = this._flex;
      }

      this._cdr.markForCheck();
      this.flexChange.emit(this._flex);
    }
  }
  private _flex?: string;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(v) {
    this._disabled = coerceBooleanProperty(v);
    this._cdr.markForCheck();
  }
  private _disabled?: boolean;

  @Output() flexChange = new EventEmitter<string>();

  @ContentChildren(SplitAreaComponent, { descendants: false })
  get areas() { return this._areas; }
  set areas(v) {
    if (v && v.length <= 2) {
      this._areas = v;

      if (this._one) {
        this._one.index = 0;

        if (this._areas.length === 1) {
          this._one.flex = '1 1 auto';
        } else {
          this._one.flex = this.flex ? this.flex : '1 1 50%';
        }
      }

      if (this._two) {
        this._two.index = 2;
        this._two.flex = '1 1 50%';
      }
    }

    this._cdr.markForCheck();
  }
  private _areas: QueryList<SplitAreaComponent>;

  get vertical() {
    return this._name === 'rdx-vertical-split';
  }

  private get _name() {
    return this.el.nativeElement.nodeName.toLowerCase();
  }

  private get _one() {
    return this._areas.toArray()[0];
  }

  private get _two() {
    return this._areas.toArray()[1];
  }

  constructor(
    readonly el: ElementRef<HTMLElement>,
    private readonly _cdr: ChangeDetectorRef,
  ) {
    super();
    this.el.nativeElement.classList.add(this._name);
  }

  onDrag(e: number) {
    if (this._areas) {
      let pct: number;

      if (this.vertical) {
        pct = pxToPct(this._areas.first.clientWidth + e, this.el.nativeElement.clientWidth);
      } else {
        pct = pxToPct(this._areas.first.clientHeight + e, this.el.nativeElement.clientHeight);
      }

      this.flex = `0 0 ${ pct <= 100 ? pct : 100 }%`;
    }
  }
}
