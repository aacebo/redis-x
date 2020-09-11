import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '../../common/icon';
import { DrawerModule } from '../../common/drawer';

import { ClientsSidenavComponent } from './clients-sidenav.component';
import { ClientsSidenavItemComponent } from './clients-sidenav-item.component';

@NgModule({
  declarations: [ClientsSidenavComponent, ClientsSidenavItemComponent],
  exports: [ClientsSidenavComponent],
  imports: [
    CommonModule,

    DrawerModule,
    IconModule,
  ],
})
export class ClientsSidenavModule { }
