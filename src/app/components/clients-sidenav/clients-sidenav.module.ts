import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ClientsSidenavComponent } from './clients-sidenav.component';

@NgModule({
  declarations: [ClientsSidenavComponent],
  exports: [ClientsSidenavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
  ]
})
export class ClientsSidenavModule { }
