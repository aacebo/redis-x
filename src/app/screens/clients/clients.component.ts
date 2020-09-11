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
    this._createClientDialogService.open().result.then(v => {
      if (v) {
        this.redisService.create(v);
      }
    }).catch(() => undefined);
  }

  keyValue(e: IJsonTreeNode) {
    this._keyValueDialogService.open({
      path: e.path,
      value: e.value,
      type: e.type,
    }).result.then(v => {
      if (v) {
        const id = this.redisService.getStateProp('active');
        const client = this.redisService.getStateProp('clients')[id];
        let value = client.map;

        for (let i = 0; i < v.path.length - 1; i++) {
          value = value[v.path[i]];
        }

        value[v.key] = v.value;

        if (e.key !== v.key) {
          delete value[e.key];
        }

        this.redisService.keyValueSet({
          id,
          key: v.path[0],
          value: client.map[v.path[0]],
        });
      }
    }).catch(() => undefined);
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
