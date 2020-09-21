import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrawerComponent } from './drawer.component';
import { DrawerAsideComponent } from './drawer-aside.component';
import { DrawerContentComponent } from './drawer-content.component';

const declarations = [
  DrawerComponent,
  DrawerAsideComponent,
  DrawerContentComponent,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class DrawerModule { }
