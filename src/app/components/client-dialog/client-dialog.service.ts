import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IClient } from '../../stores/clients';

import { ClientDialogModule } from './client-dialog.module';
import { ClientDialogComponent } from './client-dialog.component';

@Injectable({
  providedIn: ClientDialogModule,
})
export class ClientDialogService {
  constructor(private readonly _modal: NgbModal) { }

  open(client?: IClient) {
    const ref = this._modal.open(ClientDialogComponent);
    ref.componentInstance.client = client;
    return ref;
  }
}
