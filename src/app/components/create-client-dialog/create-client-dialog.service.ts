import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IClient } from '../../stores/clients';

import { CreateClientDialogModule } from './create-client-dialog.module';
import { CreateClientDialogComponent } from './create-client-dialog.component';

@Injectable({
  providedIn: CreateClientDialogModule,
})
export class CreateClientDialogService {
  constructor(private readonly _modal: NgbModal) { }

  open(client?: IClient) {
    const ref = this._modal.open(CreateClientDialogComponent);
    ref.componentInstance.client = client;
    return ref;
  }
}
