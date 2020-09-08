import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { DrawerModule } from '../../common/drawer';

import { ClientsSidenavComponent } from './clients-sidenav.component';
import { ClientsSidenavItemComponent } from './clients-sidenav-item.component';

@NgModule({
  declarations: [ClientsSidenavComponent, ClientsSidenavItemComponent],
  exports: [ClientsSidenavComponent],
  imports: [
    CommonModule,

    DrawerModule,
    MatIconModule,
  ],
})
export class ClientsSidenavModule { }
