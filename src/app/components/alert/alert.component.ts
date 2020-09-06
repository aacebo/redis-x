import { Component, ChangeDetectionStrategy, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { IAlertData } from './alert-data.interface';

@Component({
  selector: 'rdx-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  host: {
    class: 'rdx-alert',
    '(click)': 'close()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AlertComponent implements OnInit {
  icon: string;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) readonly data: IAlertData,
    private readonly _snackbarRef: MatSnackBarRef<void>,
  ) { }

  ngOnInit() {
    this.icon = this.data.type === 'info' ? 'info' :
                this.data.type === 'success' ? 'thumbs-up' :
                'alert-triangle';
  }

  close() {
    this._snackbarRef.dismiss();
  }
}
