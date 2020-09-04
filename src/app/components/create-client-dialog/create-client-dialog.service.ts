import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IRedisCreateRequest } from '../../../electron/dtos/redis';

import { CreateClientDialogModule } from './create-client-dialog.module';
import { CreateClientDialogComponent } from './create-client-dialog.component';

@Injectable({
  providedIn: CreateClientDialogModule,
})
export class CreateClientDialogService {
  constructor(private readonly _dialog: MatDialog) { }

  open() {
    return this._dialog.open<CreateClientDialogComponent, void, IRedisCreateRequest>(CreateClientDialogComponent);
  }
}
