import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rdx-drawer-aside',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./drawer-aside.component.scss'],
  host: { class: 'rdx-drawer-aside' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerAsideComponent { }
