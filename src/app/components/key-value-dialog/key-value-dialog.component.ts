import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

import { JsonTreeNodeType } from '../json-tree';

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
  key: FormControl;
  value: FormControl;
  type = JsonTreeNodeType.String;
  originalValue: any;

  readonly types = [
    JsonTreeNodeType.String,
    JsonTreeNodeType.Number,
    JsonTreeNodeType.Boolean,
    JsonTreeNodeType.Object,
    JsonTreeNodeType.Array,
  ];

  readonly typeViews = {
    [JsonTreeNodeType.String]: 'input',
    [JsonTreeNodeType.Number]: 'input',
    [JsonTreeNodeType.Undefined]: 'input',
    [JsonTreeNodeType.Null]: 'input',
    [JsonTreeNodeType.Date]: 'input',
    [JsonTreeNodeType.Boolean]: 'boolean',
    [JsonTreeNodeType.Object]: 'code',
    [JsonTreeNodeType.Array]: 'code',
  };

  get inputType() {
    return this.type === JsonTreeNodeType.String ? 'text' :
           this.type === JsonTreeNodeType.Number ? 'number' :
           undefined;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: IKeyValueData,
    private readonly _fb: FormBuilder,
    private readonly _dialogRef: MatDialogRef<IKeyValueResponse>,
  ) { }

  ngOnInit() {
    this.type = this.data.type;
    this.originalValue = this.data.value;
    this.key = this._fb.control(this.data.path[this.data.path.length - 1]);
    this.value = this._fb.control(this._parseValue(this.data.type, this.data.value));
    this.form = this._fb.group({
      key: this.key,
      value: this.value,
    });
  }

  update() {
    const path = [...this.data.path.slice(0, this.data.path.length - 1), this.form.value.key];

    this._dialogRef.close({
      path,
      ...this.form.value,
    });
  }

  onTypeChange(e: JsonTreeNodeType) {
    this.type = e;
    this.value.reset(this._parseValue(e, this.originalValue));
  }

  private _parseValue(type: JsonTreeNodeType, value: any) {
    if (type === JsonTreeNodeType.String) {
      return `${value}`;
    } else if (type === JsonTreeNodeType.Number) {
      return coerceNumberProperty(value, 0);
    } else if (type === JsonTreeNodeType.Boolean) {
      return coerceBooleanProperty(value);
    }
  }
}
