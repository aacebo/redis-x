import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { KeyValueDialogModule } from './key-value-dialog.module';
import { KeyValueDialogComponent } from './key-value-dialog.component';
import { IKeyValue } from './key-value.interface';

@Injectable({
  providedIn: KeyValueDialogModule,
})
export class KeyValueDialogService {
  constructor(private readonly _dialog: MatDialog) { }

  open<T = any>(data: IKeyValue<T>) {
    return this._dialog.open<KeyValueDialogComponent, IKeyValue<T>, any>(KeyValueDialogComponent, { data });
  }
}
