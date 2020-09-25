import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { IconModule } from '../icon';
import { HighlightModule } from '../highlight';

import { JsonTreeComponent } from './json-tree.component';

@NgModule({
  declarations: [JsonTreeComponent],
  exports: [JsonTreeComponent],
  imports: [
    CommonModule,
    NgbPopoverModule,

    IconModule,
    HighlightModule,
  ],
})
export class JsonTreeModule { }
