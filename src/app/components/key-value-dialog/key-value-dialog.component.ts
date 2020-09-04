import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IRedisKeyValueSetRequest } from '../../../electron/dtos/redis/request';

@Component({
  selector: 'rdx-key-value-dialog',
  templateUrl: './key-value-dialog.component.html',
  styleUrls: ['./key-value-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyValueDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) readonly data: IRedisKeyValueSetRequest) { }
}
