import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  forwardRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import CodeMirror from 'codemirror';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/mode/javascript/javascript.js';

import { jsonValid } from '../../../electron/utils';

let nextId = 0;

@Component({
  selector: 'rdx-json-editor',
  template: `<textarea #textarea></textarea>`,
  styleUrls: ['./json-editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JsonEditorComponent),
    multi: true,
  }],
  host: { class: 'rdx-json-editor' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class JsonEditorComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input()
  get id() { return this._id; }
  set id(v) {
    this._id = v;
  }
  protected _id = `${++nextId}`;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(v) {
    this._disabled = coerceBooleanProperty(v);

    if (this.editor) {
      this.editor.setOption('readOnly', this._disabled);
    }
  }
  protected _disabled = false;

  @ViewChild('textarea')
  readonly textarea: ElementRef<HTMLTextAreaElement>;

  get value() { return this._value; }
  set value(v) {
    this.invalid = v && !jsonValid(v);
    this._value = v;

    if (this.editor && v !== this.editor.getValue()) {
      this.editor.setValue(v ? `${v}` : '');
    }

    if (v && !this.invalid) {
      this.pretty = this._getPretty(v) === v;
    }

    this.cdr.markForCheck();
    this.onChange(v);
  }
  protected _value?: string;

  editor: CodeMirror.EditorFromTextArea;
  invalid = false;
  pretty = false;

  onChange: (v: any) => void = () => {};
  onTouch = () => {};

  constructor(readonly cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.editor = CodeMirror.fromTextArea(this.textarea.nativeElement, {
      lineNumbers: true,
      theme: 'dracula',
      mode: 'application/json',
      readOnly: this._disabled,
      lint: true,
      tabSize: 2,
      autofocus: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      viewportMargin: Infinity,
      autoCloseBrackets: true,
    });

    this.editor.on('change', this._onEditorChange.bind(this));
    this.editor.setValue(this.value || '');
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.off('change', this._onEditorChange.bind(this));
    }
  }

  beautify() {
    if (this.value && !this.invalid) {
      if (this.pretty) {
        this.editor.setValue(this._getPretty(this.value, null));
      } else {
        this.editor.setValue(this._getPretty(this.value));
      }
    }
  }

  writeValue(value: any) {
    if (value !== this.value) {
      this.value = value;
    }
  }

  registerOnChange(fn: (v: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this.onTouch = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  private _onEditorChange(editor: CodeMirror.EditorFromTextArea) {
    const v = editor.getValue();

    if (v !== this.value) {
      this.value = v;
    }
  }

  private _getPretty(v: string, indent = 2) {
    return JSON.stringify(JSON.parse(v), undefined, indent);
  }
}
