import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RedisService } from '../../stores/redis';

import { CreateClientDialogService } from '../../components/create-client-dialog';
import { KeyValueDialogService } from '../../components/key-value-dialog';
import { IJsonTreeNode } from '../../components/json-tree';

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
    private readonly _keyValueDialogService: KeyValueDialogService,
  ) { }

  create() {
    this._createClientDialogService.open().afterClosed().subscribe(v => {
      if (v) {
        this.redisService.create(v);
      }
    });
  }

  keyValue(e: IJsonTreeNode) {
    this._keyValueDialogService.open({
      path: e.path,
      value: e.value,
    });
  }

  keyLoad(e: IJsonTreeNode) {
    this.redisService.key(e.key);
  }

  activate(id: string) {
    this.redisService.activate(id);
  }

  remove(id: string) {
    this.redisService.remove(id);
  }
}
