import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rdx-breadcrumbs',
  template: `<ng-content select="rdx-breadcrumb"></ng-content>`,
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent { }
