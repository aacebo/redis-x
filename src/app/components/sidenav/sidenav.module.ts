import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { DrawerModule } from '../../common/drawer';
import { IconModule } from '../../common/icon';
import { ButtonModule } from '../../common/button';

import { SidenavComponent } from './sidenav.component';

@NgModule({
  declarations: [SidenavComponent],
  exports: [SidenavComponent],
  imports: [
    CommonModule,
    RouterModule,

    NgbTooltipModule,

    DrawerModule,
    IconModule,
    ButtonModule,
  ],
})
export class SidenavModule { }
