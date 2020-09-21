import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rdx-drawer-content',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./drawer-content.component.scss'],
  host: { class: 'rdx-drawer-content' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerContentComponent { }
