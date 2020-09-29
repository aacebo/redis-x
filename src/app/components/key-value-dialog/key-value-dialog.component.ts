import { Component, ChangeDetectionStrategy, OnInit, ViewChild, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { jsonTryStringify, jsonTryParse } from '../../../electron/utils';
import { JsonEditorComponent } from '../../common/json-editor';
import { JsonTreeNodeType } from '../../common/json-tree';

import { IKeyValueData } from './key-value-data.interface';

type JsonValueType = 'string' | 'number' | 'boolean' | 'json';

@Component({
  selector: 'rdx-key-value-dialog',
  templateUrl: './key-value-dialog.component.html',
  styleUrls: ['./key-value-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyValueDialogComponent implements OnInit, AfterViewInit {
  @Input() data: IKeyValueData;

  @ViewChild(JsonEditorComponent)
  readonly jsonEditor?: JsonEditorComponent;

  form: FormGroup;
  key: FormControl;
  value: FormControl;
  type: JsonValueType = 'string';

  readonly types = [
    'string',
    'number',
    'boolean',
    'json',
  ];

  private readonly _typeViews: { [type: string]: JsonValueType } = {
    [JsonTreeNodeType.String]: 'string',
    [JsonTreeNodeType.Number]: 'number',
    [JsonTreeNodeType.Undefined]: 'string',
    [JsonTreeNodeType.Null]: 'string',
    [JsonTreeNodeType.Date]: 'string',
    [JsonTreeNodeType.Boolean]: 'boolean',
    [JsonTreeNodeType.Object]: 'json',
    [JsonTreeNodeType.Array]: 'json',
  };

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _fb: FormBuilder,
    private readonly _modalRef: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.type = this._typeViews[this.data.type];
    this.key = this._fb.control(this.data.path[this.data.path.length - 1]);
    this.value = this._fb.control(this._parseValue(this.type, this.data.value));
    this.form = this._fb.group({
      key: this.key,
      value: this.value,
    });
  }

  ngAfterViewInit() {
    this._cdr.detectChanges();
  }

  update() {
    const path = [...this.data.path.slice(0, this.data.path.length - 1), this.form.value.key];

    this._modalRef.close({
      path,
      key: this.form.value.key,
      value: this._parseValue(this.type, this.form.value.value, true),
    });
  }

  format() {
    this.jsonEditor?.format();
  }

  dismiss() {
    this._modalRef.dismiss();
  }

  onTypeChange(e: JsonValueType) {
    if (this.type === 'json') {
      this.value.clearValidators();
    }

    this.type = undefined;

    this.value.reset(this._parseValue(e, this.data.value));
    this.value.updateValueAndValidity();

    if (e !== this._typeViews[this.data.type]) {
      this.value.markAsDirty();
      this.value.markAsTouched();
    }

    this.type = e;
  }

  private _parseValue(type: JsonValueType, value: any, save = false) {
    if (type === 'string') {
      return typeof value === 'object' ? jsonTryStringify(value) : `${value}`;
    } else if (type === 'number') {
      return coerceNumberProperty(value, 0);
    } else if (type === 'boolean') {
      return coerceBooleanProperty(value);
    }

    return save ? jsonTryParse(value) : jsonTryStringify(value, 2);
  }
}
