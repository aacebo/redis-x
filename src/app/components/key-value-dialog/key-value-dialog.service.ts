import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IRedisKeyValueSetRequest } from '../../../electron/dtos/redis/request';

import { KeyValueDialogModule } from './key-value-dialog.module';
import { KeyValueDialogComponent } from './key-value-dialog.component';

@Injectable({
  providedIn: KeyValueDialogModule,
})
export class KeyValueDialogService {
  constructor(private readonly _dialog: MatDialog) { }

  open<T = any>(data: IRedisKeyValueSetRequest<T>) {
    return this._dialog.open<KeyValueDialogComponent, IRedisKeyValueSetRequest<T>, any>(KeyValueDialogComponent, { data });
  }
}
