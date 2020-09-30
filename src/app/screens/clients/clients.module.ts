import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsSidenavModule } from '../../components/clients-sidenav';
import { CreateClientDialogModule } from '../../components/create-client-dialog';
import { ConfirmDialogModule } from '../../components/confirm-dialog';

import { ClientsComponent } from './clients.component';
import { ClientsRoutingModule } from './clients-routing.module';

@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,

    ClientsRoutingModule,
    ClientsSidenavModule,
    CreateClientDialogModule,
    ConfirmDialogModule,
  ],
})
export class ClientsModule { }
