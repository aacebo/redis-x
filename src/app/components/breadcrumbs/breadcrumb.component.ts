import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rdx-breadcrumb',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent { }
