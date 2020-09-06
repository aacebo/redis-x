import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { AlertModule } from './alert.module';
import { AlertComponent } from './alert.component';
import { IAlertData } from './alert-data.interface';

@Injectable({
  providedIn: AlertModule,
})
export class AlertService {
  private readonly _config: MatSnackBarConfig<IAlertData> = {
    duration: 5000,
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
  };

  constructor(private readonly _snackbar: MatSnackBar) { }

  info(message: string) {
    this._snackbar.openFromComponent(AlertComponent, {
      ...this._config,
      data: { message, type: 'info' },
      panelClass: 'info',
    });
  }

  success(message: string) {
    this._snackbar.openFromComponent(AlertComponent, {
      ...this._config,
      data: { message, type: 'success' },
      panelClass: 'success',
    });
  }

  error(message: string) {
    this._snackbar.openFromComponent(AlertComponent, {
      ...this._config,
      data: { message, type: 'error' },
      panelClass: 'error',
    });
  }
}
