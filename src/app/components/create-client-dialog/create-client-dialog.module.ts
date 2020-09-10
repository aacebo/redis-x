import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { CreateClientDialogComponent } from './create-client-dialog.component';

@NgModule({
  declarations: [CreateClientDialogComponent],
  entryComponents: [CreateClientDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NgbModalModule,
  ],
})
export class CreateClientDialogModule { }
