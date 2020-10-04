import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AboutDialogModule } from './about-dialog.module';
import { AboutDialogComponent } from './about-dialog.component';

@Injectable({
  providedIn: AboutDialogModule,
})
export class AboutDialogService {
  constructor(private readonly _modal: NgbModal) { }

  open() {
    const ref = this._modal.open(AboutDialogComponent, { size: 'sm' });
    return ref;
  }
}
