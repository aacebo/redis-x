import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsonTreeModule } from '../../../common/json-tree';
import { IconModule } from '../../../common/icon';

import { KeyValueDialogModule } from '../../../components/key-value-dialog';
import { ConfirmDialogModule } from '../../../components/confirm-dialog';
import { SearchInputModule } from '../../../components/search-input';

import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,

    JsonTreeModule,
    IconModule,

    KeyValueDialogModule,
    ConfirmDialogModule,
    SearchInputModule,

    ClientRoutingModule,
  ],
})
export class ClientModule { }
