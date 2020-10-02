import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IClient } from '../../stores/clients';

@Component({
  selector: 'rdx-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDialogComponent implements OnInit {
  @Input() client?: IClient;

  form: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _modalRef: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.form = this._fb.group({
      name: this._fb.control(this.client?.name || undefined),
      host: this._fb.control(this.client?.host || 'localhost'),
      port: this._fb.control(this.client?.port || 6379),
      password: this._fb.control(this.client?.password || undefined),
    });
  }

  connect() {
    this._modalRef.close({
      ...this.form.value,
      password: this.form.value.password || undefined,
    });
  }

  dismiss() {
    this._modalRef.dismiss();
  }
}
