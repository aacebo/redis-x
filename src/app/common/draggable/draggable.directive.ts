import { Output, HostListener, EventEmitter, Directive, Input, ElementRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { DraggableDirection } from './draggable-direction.type';

@Directive({
  exportAs: 'rdxDraggable',
  selector: '[rdxDraggable]',
  host: {
    class: 'rdx-draggable',
    '[class.rdx-draggable--dragging]': 'dragging',
  },
})
export class DraggableDirective {
  @Input('rdxDraggable') direction: DraggableDirection = 'vertical';

  @Input('rdxDraggableDisabled')
  get disabled() { return this._disabled; }
  set disabled(v: boolean) {
    this._disabled = coerceBooleanProperty(v);
  }
  private _disabled?: boolean;

  @Output('rdxDraggableDrag') drag = new EventEmitter<number>();
  @Output('rdxDraggableDragStart') dragStart = new EventEmitter<number>();
  @Output('rdxDraggableDragEnd') dragEnd = new EventEmitter<number>();

  get vertical() { return this.direction === 'vertical'; }
  get dragging() { return this._x !== undefined || this._y !== undefined; }

  protected _x?: number;
  protected _y?: number;

  constructor(readonly el: ElementRef<HTMLElement>) { }

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    if (!this.disabled) {
      if (!this.vertical) {
        this._x = e.clientX;
      } else {
        this._y = e.clientY;
      }

      this.dragStart.emit(this.vertical ? e.clientY : e.clientX);
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.disabled) {
      e.preventDefault();

      if (this._x !== undefined) {
        this.drag.emit(e.clientX - this._x);
        this._x = e.clientX;
      } else if (this._y !== undefined) {
        this.drag.emit(e.clientY - this._y);
        this._y = e.clientY;
      }
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e: MouseEvent) {
    if (!this.disabled) {
      if (this._x !== undefined) {
        this._x = undefined;
      }

      if (this._y !== undefined) {
        this._y = undefined;
      }

      this.dragEnd.emit(this.vertical ? e.clientY : e.clientX);
    }
  }
}
