import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmDialogModule } from './confirm-dialog.module';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable({
  providedIn: ConfirmDialogModule,
})
export class ConfirmDialogService {
  constructor(private readonly _modal: NgbModal) { }

  open(message: string) {
    const ref = this._modal.open(ConfirmDialogComponent);
    ref.componentInstance.message = message;
    return ref.result.catch(() => undefined);
  }
}
