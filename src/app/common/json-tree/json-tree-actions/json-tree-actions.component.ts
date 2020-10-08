import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rdx-json-tree-actions',
  template: `<ng-content select="rdx-json-tree-action"></ng-content>`,
  styleUrls: ['./json-tree-actions.component.scss'],
  host: { class: 'rdx-json-tree-actions' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonTreeActionsComponent { }
