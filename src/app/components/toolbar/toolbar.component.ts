import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'rdx-toolbar',
  template: '',
  styleUrls: ['./toolbar.component.scss'],
  host: { '[class.fullscreen]': 'fullscreen' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  @Input()
  get fullscreen() { return this._fullscreen; }
  set fullscreen(v) {
    this._fullscreen = coerceBooleanProperty(v);
  }
  private _fullscreen = false;
}
