import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '../icon';

import { JsonTreeComponent } from './json-tree.component';

@NgModule({
  declarations: [JsonTreeComponent],
  exports: [JsonTreeComponent],
  imports: [CommonModule, IconModule],
})
export class JsonTreeModule { }
