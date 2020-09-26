import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ClientsService } from '../../stores/clients';
import { KeysService } from '../../stores/keys';
import { InfoService } from '../../stores/info';

import { CreateClientDialogService } from '../../components/create-client-dialog';
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
    private readonly _createClientDialogService: CreateClientDialogService,
  ) { }

  create() {
    this._createClientDialogService.open().result.then(v => {
      if (v) {
        this.clientsService.create(v);
      }
    }).catch(() => undefined);
  }

  remove(id: string) {
    this.clientsService.remove(id);
    this._keysService.remove(id);
    this._infoService.remove(id);
  }
}
