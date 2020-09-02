import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RedisService } from '../../stores/redis';

import { CreateClientDialogService } from '../create-client-dialog';

@Component({
  selector: 'rdx-clients-sidenav',
  templateUrl: './clients-sidenav.component.html',
  styleUrls: ['./clients-sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsSidenavComponent {
  constructor(
    readonly redisService: RedisService,
    private readonly _createClientDialogService: CreateClientDialogService,
  ) { }

  createClient() {
    this._createClientDialogService.open().afterClosed().subscribe(v => {
      if (v) {
        this.redisService.create(v);
      }
    });
  }
}
