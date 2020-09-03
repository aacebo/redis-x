import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

import { ClientsSidenavComponent } from './clients-sidenav.component';
import { ClientsSidenavItemComponent } from './clients-sidenav-item.component';

@NgModule({
  declarations: [ClientsSidenavComponent, ClientsSidenavItemComponent],
  exports: [ClientsSidenavComponent],
  imports: [
    CommonModule,

    MatSidenavModule,
    MatIconModule,
  ],
})
export class ClientsSidenavModule { }
