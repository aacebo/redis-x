import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { NumberValidatorModule } from '../../validators/number';
import { JsonValidatorModule } from '../../validators/json';

import { JsonEditorModule } from '../../common/json-editor';

import { KeyValueDialogComponent } from './key-value-dialog.component';

@NgModule({
  declarations: [KeyValueDialogComponent],
  entryComponents: [KeyValueDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NgbModalModule,
    NgbNavModule,

    NumberValidatorModule,
    JsonValidatorModule,

    JsonEditorModule,
  ],
})
export class KeyValueDialogModule { }
