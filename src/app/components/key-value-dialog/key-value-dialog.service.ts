import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { KeyValueDialogModule } from './key-value-dialog.module';
import { KeyValueDialogComponent } from './key-value-dialog.component';
import { IKeyValueData } from './key-value-data.interface';

@Injectable({
  providedIn: KeyValueDialogModule,
})
export class KeyValueDialogService {
  constructor(private readonly _modal: NgbModal) { }

  open<T = any>(data: IKeyValueData<T>) {
    const ref = this._modal.open(KeyValueDialogComponent, { size: 'xl' });
    ref.componentInstance.data = data;
    return ref.result.catch(() => undefined);
  }
}
