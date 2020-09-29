import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooleanValidatorDirective } from './boolean-validator.directive';

@NgModule({
  declarations: [BooleanValidatorDirective],
  exports: [BooleanValidatorDirective],
  imports: [CommonModule],
})
export class BooleanValidatorModule { }
