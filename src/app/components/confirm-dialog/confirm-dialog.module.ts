import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ButtonModule } from '../../common/button';
import { IconModule } from '../../common/icon';

import { ConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,

    NgbModalModule,

    ButtonModule,
    IconModule,
  ],
})
export class ConfirmDialogModule { }
