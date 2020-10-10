import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

import { IJsonTreeNodeActionClickEvent } from '../json-tree-node-action-click-event.interface';
import { JsonTreeNodeAction } from '../json-tree-node-action.type';
import { IJsonTreeNodeExpanded } from '../json-tree-node-expanded.interface';
import { IJsonTreeNode } from '../json-tree-node.interface';

@Component({
  selector: 'rdx-json-tree-node',
  templateUrl: './json-tree-node.component.html',
  styleUrls: ['./json-tree-node.component.scss'],
  host: {
    class: 'rdx-json-tree-node',
    '[class.expandable]': 'node.expandable',
    '[class.expanded]': 'state[node.key]?.expanded',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonTreeNodeComponent {
  @Input() path: string[] = [];
  @Input() filter?: string;
  @Input() state: { [key: string]: IJsonTreeNodeExpanded; } = { };
  @Input() child = false;
  @Input() expanded = false;

  @Input()
  get node() { return this._node; }
  set node(v) {
    if (this._node) {
      this._el.nativeElement.classList.remove(`rdx-json-tree-node--${this._node.type}`);
    }

    this._el.nativeElement.classList.add(`rdx-json-tree-node--${v.type}`);
    this._node = v;
  }
  private _node: IJsonTreeNode;

  @Output() propertyValueClick = new EventEmitter<IJsonTreeNode>();
  @Output() propertyLoadClick = new EventEmitter<IJsonTreeNode>();
  @Output() propertyActionClick = new EventEmitter<IJsonTreeNodeActionClickEvent>();

  constructor(private readonly _el: ElementRef<HTMLElement>) { }

  toggle(e: Event, node: IJsonTreeNode) {
    if (node.expandable) {
      e.stopImmediatePropagation();
      e.preventDefault();
      this.state[node.key].expanded = !this.state[node.key].expanded;
    }
  }

  onPropertyValueClick(node: IJsonTreeNode) {
    if (node.value === undefined) {
      this.propertyLoadClick.emit(node);
    } else {
      this.propertyValueClick.emit(node);
    }
  }

  onActionClick(type: JsonTreeNodeAction, node: IJsonTreeNode) {
    this.propertyActionClick.emit({ type, node });
  }

  onActionToggleClick(e: Event, popover: NgbPopover) {
    e.stopImmediatePropagation();
    e.preventDefault();
    popover.open();
  }
}
