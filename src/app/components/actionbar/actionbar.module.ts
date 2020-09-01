import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionbarComponent } from './actionbar.component';

@NgModule({
  declarations: [ActionbarComponent],
  exports: [ActionbarComponent],
  imports: [CommonModule],
})
export class ActionbarModule { }
