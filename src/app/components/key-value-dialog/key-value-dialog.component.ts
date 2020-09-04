import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IKeyValueData } from './key-value-data.interface';
import { IKeyValueResponse } from './key-value-response.interface';

@Component({
  selector: 'rdx-key-value-dialog',
  templateUrl: './key-value-dialog.component.html',
  styleUrls: ['./key-value-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyValueDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: IKeyValueData,
    private readonly _fb: FormBuilder,
    private readonly _dialogRef: MatDialogRef<IKeyValueResponse>,
  ) { }

  ngOnInit() {
    this.form = this._fb.group({
      key: this._fb.control(this.data.path[this.data.path.length - 1]),
      value: this._fb.control(this.data.value),
    });
  }

  update() {
    const path = [...this.data.path.slice(0, this.data.path.length - 1), this.form.value.key];

    this._dialogRef.close({
      path,
      ...this.form.value,
    });
  }
}
