import { Component, ChangeDetectionStrategy, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { jsonTryStringify, jsonTryParse } from '../../../electron/utils';
import { JsonEditorComponent } from '../../common/json-editor';
import { JsonTreeNodeType } from '../../common/json-tree';

import { IKeyValueData } from './key-value-data.interface';

@Component({
  selector: 'rdx-key-value-dialog',
  templateUrl: './key-value-dialog.component.html',
  styleUrls: ['./key-value-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyValueDialogComponent implements OnInit {
  @Input() data: IKeyValueData;

  @ViewChild(JsonEditorComponent)
  readonly jsonEditor?: JsonEditorComponent;

  form: FormGroup;
  key: FormControl;
  value: FormControl;
  view: 'string' | 'number' | 'boolean' | 'json' = 'string';

  readonly views = [
    'string',
    'number',
    'boolean',
    'json',
  ];

  private readonly _typeViews = {
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
    private readonly _fb: FormBuilder,
    private readonly _modalRef: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.view = this._typeViews[this.data.type];
    this.key = this._fb.control(this.data.path[this.data.path.length - 1]);
    this.value = this._fb.control(this._parseValue(this.view, this.data.value));
    this.form = this._fb.group({
      key: this.key,
      value: this.value,
    });
  }

  update() {
    const path = [...this.data.path.slice(0, this.data.path.length - 1), this.form.value.key];

    this._modalRef.close({
      path,
      key: this.form.value.key,
      value: this._parseValue(this.view, this.form.value.value, true),
    });
  }

  format() {
    if (this.jsonEditor) {
      this.jsonEditor.format();
    }
  }

  onTypeChange(e: 'string' | 'number' | 'boolean' | 'json') {
    this.view = undefined;
    this.value.reset(this._parseValue(e, this.data.value));
    this.value.clearValidators();
    this.value.updateValueAndValidity();

    if (e !== this._typeViews[this.data.type]) {
      this.value.markAsDirty();
      this.value.markAsTouched();
    }

    this.view = e;
  }

  dismiss() {
    this._modalRef.dismiss();
  }

  private _parseValue(view: 'string' | 'number' | 'boolean' | 'json', value: any, save = false) {
    if (view === 'string') {
      return `${value}`;
    } else if (view === 'number') {
      return coerceNumberProperty(value, 0);
    } else if (view === 'boolean') {
      return coerceBooleanProperty(value);
    }

    return save ? jsonTryParse(value) : jsonTryStringify(value, 2);
  }
}
