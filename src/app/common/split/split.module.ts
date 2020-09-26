import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DraggableModule } from '../draggable/draggable.module';

import { SplitComponent } from './components/split/split.component';
import { SplitAreaComponent } from './components/split-area/split-area.component';

const declarations = [
  SplitComponent,
  SplitAreaComponent,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule, DraggableModule],
})
export class SplitModule { }
