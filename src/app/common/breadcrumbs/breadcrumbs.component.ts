import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rdx-breadcrumbs',
  template: `<ng-content select="rdx-breadcrumb"></ng-content>`,
  styleUrls: ['./breadcrumbs.component.scss'],
  host: { class: 'rdx-breadcrumbs breadcrumb' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent { }
