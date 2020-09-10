import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateClientDialogModule } from './create-client-dialog.module';
import { CreateClientDialogComponent } from './create-client-dialog.component';

@Injectable({
  providedIn: CreateClientDialogModule,
})
export class CreateClientDialogService {
  constructor(private readonly _modal: NgbModal) { }

  open() {
    return this._modal.open(CreateClientDialogComponent);
  }
}
