import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'rdx-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  @Input() message: string;

  constructor(private readonly _modalRef: NgbActiveModal) { }

  dismiss() {
    this._modalRef.dismiss();
  }

  reject() {
    this._modalRef.close(false);
  }

  confirm() {
    this._modalRef.close(true);
  }
}
