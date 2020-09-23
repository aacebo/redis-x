import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsonTreeModule } from '../../../common/json-tree';

import { KeyValueDialogModule } from '../../../components/key-value-dialog';
import { SearchInputModule } from '../../../components/search-input';

import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,

    JsonTreeModule,

    KeyValueDialogModule,
    SearchInputModule,

    ClientRoutingModule,
  ],
})
export class ClientModule { }
