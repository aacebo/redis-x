import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IconModule } from '../../common/icon';
import { SplitModule } from '../../common/split';

import { ClientsSidenavComponent } from './clients-sidenav.component';
import { ClientsSidenavItemComponent } from './clients-sidenav-item.component';

@NgModule({
  declarations: [ClientsSidenavComponent, ClientsSidenavItemComponent],
  exports: [ClientsSidenavComponent],
  imports: [
    CommonModule,
    RouterModule,

    SplitModule,
    IconModule,
  ],
})
export class ClientsSidenavModule { }
