import { Component, ChangeDetectionStrategy, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ClientsService, IClient } from '../../stores/clients';

@Component({
  selector: 'rdx-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDialogComponent implements OnInit {
  @Input() client?: IClient;

  form: FormGroup;
  passwordVisible = false;

  connectable?: boolean;
  testing = false;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _modalRef: NgbActiveModal,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _clientsService: ClientsService,
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

  test() {
    this.testing = true;
    this.connectable = undefined;
    this._cdr.markForCheck();

    this._clientsService.test({
      ...this.form.value,
      password: this.form.value.password || undefined,
    }, success => {
      this.connectable = success;
      this.testing = false;
      this._cdr.markForCheck();
    });
  }
}
