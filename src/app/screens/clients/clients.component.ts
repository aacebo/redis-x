import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ClientsService, IClient } from '../../stores/clients';
import { KeysService } from '../../stores/keys';
import { InfoService } from '../../stores/info';

import { ClientDialogService } from '../../components/client-dialog';
import { ConfirmDialogService } from '../../components/confirm-dialog';

import { AppService } from '../../app.service';

@Component({
  selector: 'rdx-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent {
  constructor(
    readonly appService: AppService,
    readonly clientsService: ClientsService,
    private readonly _keysService: KeysService,
    private readonly _infoService: InfoService,
    private readonly _clientDialogService: ClientDialogService,
    private readonly _confirmDialogService: ConfirmDialogService,
  ) { }

  create() {
    this._clientDialogService.open().result.then(v => {
      if (v) {
        this.clientsService.create(v);
      }
    }).catch(() => undefined);
  }

  edit(e: IClient) {
    this._clientDialogService.open(e).result.then(v => {
      if (v) {
        this.clientsService.update({
          ...e,
          ...v,
        });
      }
    }).catch(() => undefined);
  }

  remove(id: string) {
    this._confirmDialogService.open('are you sure you want to delete this connection profile?').result.then(v => {
      if (v) {
        this.clientsService.remove({ id });
        this._keysService.remove(id);
        this._infoService.remove(id);
      }
    }).catch(() => undefined);
  }

  connect(e: IClient) {
    this.clientsService.connect(e);
  }

  disconnect(id: string) {
    this.clientsService.close({ id });
    this._keysService.remove(id);
    this._infoService.remove(id);
  }
}
