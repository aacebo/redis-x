import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsonTreeComponent } from './json-tree.component';

@NgModule({
  declarations: [JsonTreeComponent],
  exports: [JsonTreeComponent],
  imports: [CommonModule],
})
export class JsonTreeModule { }
