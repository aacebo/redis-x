import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'rdx-create-client-dialog',
  templateUrl: './create-client-dialog.component.html',
  styleUrls: ['./create-client-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateClientDialogComponent implements OnInit {
  form: FormGroup;

  constructor(private readonly _fb: FormBuilder) { }

  ngOnInit() {
    this.form = this._fb.group({
      name: this._fb.control(undefined),
      host: this._fb.control('localhost'),
      port: this._fb.control(6379),
    });
  }
}
