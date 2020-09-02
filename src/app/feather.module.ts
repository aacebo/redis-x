import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

import feather from 'feather-icons/dist/feather.min.js';

@NgModule({
  imports: [MatIconModule],
  exports: [MatIconModule],
})
export class FeatherModule {
  constructor(
    private readonly _iconRegistry: MatIconRegistry,
    private readonly _sanitizer: DomSanitizer,
  ) {
    for (const iconName in feather.icons) {
      this._iconRegistry.addSvgIconLiteral(
        iconName,
        this._sanitizer.bypassSecurityTrustHtml(feather.icons[iconName].toSvg()),
      );
    }
  }
}
