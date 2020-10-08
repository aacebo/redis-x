import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { IconModule } from '../icon';
import { HighlightModule } from '../highlight';

import { JsonTreeComponent } from './json-tree.component';
import { JsonTreeActionComponent } from './json-tree-actions/json-tree-action.component';
import { JsonTreeActionsComponent } from './json-tree-actions/json-tree-actions.component';

@NgModule({
  declarations: [JsonTreeComponent, JsonTreeActionComponent, JsonTreeActionsComponent],
  exports: [JsonTreeComponent],
  imports: [
    CommonModule,
    NgbPopoverModule,

    IconModule,
    HighlightModule,
  ],
})
export class JsonTreeModule { }
