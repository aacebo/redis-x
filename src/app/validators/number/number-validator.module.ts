import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NumberValidatorDirective } from './number-validator.directive';

@NgModule({
  declarations: [NumberValidatorDirective],
  exports: [NumberValidatorDirective],
  imports: [CommonModule],
})
export class NumberValidatorModule { }
