import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsSidenavModule } from '../../components/clients-sidenav';
import { CreateClientDialogModule } from '../../components/create-client-dialog';
import { KeyValueDialogModule } from '../../components/key-value-dialog';
import { SearchInputModule } from '../../components/search-input';

import { JsonTreeModule } from '../../common/json-tree';

import { ClientsComponent } from './clients.component';
import { ClientsRoutingModule } from './clients-routing.module';

@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,

    ClientsRoutingModule,
    ClientsSidenavModule,
    CreateClientDialogModule,
    KeyValueDialogModule,
    SearchInputModule,

    JsonTreeModule,
  ],
})
export class ClientsModule { }
