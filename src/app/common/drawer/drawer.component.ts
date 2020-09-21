import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rdx-drawer',
  template: `
    <ng-content select="rdx-drawer-aside"></ng-content>
    <ng-content select="rdx-drawer-content"></ng-content>
  `,
  styleUrls: ['./drawer.component.scss'],
  host: { class: 'rdx-drawer' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent { }
