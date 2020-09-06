import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsonValidatorDirective } from './json-validator.directive';

@NgModule({
  declarations: [JsonValidatorDirective],
  exports: [JsonValidatorDirective],
  imports: [CommonModule],
})
export class JsonValidatorModule { }
