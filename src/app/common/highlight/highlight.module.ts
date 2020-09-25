import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightComponent } from './highlight.component';

@NgModule({
  declarations: [HighlightComponent],
  exports: [HighlightComponent],
  imports: [CommonModule],
})
export class HighlightModule { }
