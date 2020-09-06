import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { NumberValidatorModule } from '../../validators/number';
import { JsonValidatorModule } from '../../validators/json';

import { JsonEditorModule } from '../json-editor';

import { KeyValueDialogComponent } from './key-value-dialog.component';

@NgModule({
  declarations: [KeyValueDialogComponent],
  entryComponents: [KeyValueDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatButtonToggleModule,

    NumberValidatorModule,
    JsonValidatorModule,
    JsonEditorModule,
  ],
})
export class KeyValueDialogModule { }
