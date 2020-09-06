import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { KeyValueDialogModule } from './key-value-dialog.module';
import { KeyValueDialogComponent } from './key-value-dialog.component';
import { IKeyValueData } from './key-value-data.interface';
import { IKeyValueResponse } from './key-value-response.interface';

@Injectable({
  providedIn: KeyValueDialogModule,
})
export class KeyValueDialogService {
  constructor(private readonly _dialog: MatDialog) { }

  open<T = any>(data: IKeyValueData<T>) {
    return this._dialog.open<KeyValueDialogComponent, IKeyValueData<T>, IKeyValueResponse<T>>(KeyValueDialogComponent, { data });
  }
}
