import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rdx-breadcrumb',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./breadcrumb.component.scss'],
  host: { class: 'rdx-breadcrumb breadcrumb-item' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent { }
