import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IKeyValue } from './key-value.interface';

@Component({
  selector: 'rdx-key-value-dialog',
  templateUrl: './key-value-dialog.component.html',
  styleUrls: ['./key-value-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyValueDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) readonly data: IKeyValue) { }
}
