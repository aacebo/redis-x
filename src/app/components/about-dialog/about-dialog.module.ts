import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ButtonModule } from '../../common/button';

import { AboutDialogComponent } from './about-dialog.component';

@NgModule({
  declarations: [AboutDialogComponent],
  imports: [
    CommonModule,

    NgbModalModule,

    ButtonModule,
  ],
})
export class AboutDialogModule { }
