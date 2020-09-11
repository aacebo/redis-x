import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import feather from 'feather-icons/dist/feather.min.js';

@Component({
  selector: 'rdx-icon',
  template: '',
  styleUrls: ['./icon.component.scss'],
  host: { '[innerHTML]': 'icon' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input()
  get name() { return this._name; }
  set name(v) {
    this._name = v;
    this._icon = this._sanitizer.bypassSecurityTrustHtml(feather.icons[v].toSvg());
  }
  private _name: string;

  get icon() { return this._icon; }
  private _icon: SafeHtml;

  constructor(private readonly _sanitizer: DomSanitizer) { }
}
