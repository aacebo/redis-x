import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

import { CreateClientDialogModule } from '../create-client-dialog';

import { ClientsSidenavComponent } from './clients-sidenav.component';

@NgModule({
  declarations: [ClientsSidenavComponent],
  exports: [ClientsSidenavComponent],
  imports: [
    CommonModule,

    MatSidenavModule,
    MatIconModule,

    CreateClientDialogModule,
  ],
})
export class ClientsSidenavModule { }
