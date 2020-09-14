import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, ChangeDetectionStrategy, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import feather from 'feather-icons/dist/feather.min.js';

@Component({
  selector: 'rdx-icon',
  template: '',
  styleUrls: ['./icon.component.scss'],
  host: {
    class: 'rdx-icon',
    '[innerHTML]': 'icon',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit {
  @Input() name: string;

  @Input()
  get diameter() { return this._diameter; }
  set diameter(v) {
    this._diameter = coerceNumberProperty(v);
  }
  private _diameter = 24;

  @Input()
  get strokeWidth() { return this._strokeWidth; }
  set strokeWidth(v) {
    this._strokeWidth = coerceNumberProperty(v);
  }
  private _strokeWidth = 1;

  get icon() { return this._icon; }
  private _icon: SafeHtml;

  constructor(private readonly _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this._icon = this._sanitizer.bypassSecurityTrustHtml(feather.icons[this.name].toSvg({
      height: this._diameter,
      width: this._diameter,
      'stroke-width': this._strokeWidth,
    }));
  }
}
