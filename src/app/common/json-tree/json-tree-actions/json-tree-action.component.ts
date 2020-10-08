import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'rdx-json-tree-action',
  templateUrl: './json-tree-action.component.html',
  styleUrls: ['./json-tree-action.component.scss'],
  host: { class: 'rdx-json-tree-action' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonTreeActionComponent {
  @Input() icon: string;
}
