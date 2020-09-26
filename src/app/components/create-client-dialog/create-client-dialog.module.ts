import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '../../common/forms';
import { IconModule } from '../../common/icon';
import { ButtonModule } from '../../common/button';

import { CreateClientDialogComponent } from './create-client-dialog.component';

@NgModule({
  declarations: [CreateClientDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NgbModalModule,

    FormsModule,
    IconModule,
    ButtonModule,
  ],
})
export class CreateClientDialogModule { }
