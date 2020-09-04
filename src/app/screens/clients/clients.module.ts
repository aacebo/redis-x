import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsSidenavModule } from '../../components/clients-sidenav';
import { CreateClientDialogModule } from '../../components/create-client-dialog';
import { JsonTreeModule } from '../../components/json-tree';

import { ClientsComponent } from './clients.component';
import { ClientsRoutingModule } from './clients-routing.module';

@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,

    ClientsRoutingModule,
    ClientsSidenavModule,
    CreateClientDialogModule,
    JsonTreeModule,
  ],
})
export class ClientsModule { }
