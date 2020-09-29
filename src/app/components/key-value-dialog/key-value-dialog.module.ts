import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModalModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import { NumberValidatorModule } from '../../validators/number';
import { JsonValidatorModule } from '../../validators/json';

import { JsonEditorModule } from '../../common/json-editor';
import { FormsModule } from '../../common/forms';
import { ButtonModule } from '../../common/button';
import { IconModule } from '../../common/icon';
import { BreadcrumbsModule } from '../../common/breadcrumbs';

import { KeyValueDialogComponent } from './key-value-dialog.component';

@NgModule({
  declarations: [KeyValueDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NgbModalModule,
    NgbDropdownModule,

    NumberValidatorModule,
    JsonValidatorModule,

    JsonEditorModule,
    FormsModule,
    ButtonModule,
    IconModule,
    BreadcrumbsModule,
  ],
})
export class KeyValueDialogModule { }
