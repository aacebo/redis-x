import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RedisService } from '../../stores/redis';

import { CreateClientDialogService } from '../../components/create-client-dialog';

@Component({
  selector: 'rdx-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent {
  constructor(
    readonly redisService: RedisService,
    private readonly _createClientDialogService: CreateClientDialogService,
  ) { }

  create() {
    this._createClientDialogService.open().afterClosed().subscribe(v => {
      if (v) {
        this.redisService.create(v);
      }
    });
  }
}
