import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RedisService } from '../../stores/redis';
import { jsonTryStringify } from '../../../electron/utils';
import { ApiService } from '../../api';
import { IJsonTreeNode, IJsonTreeNodeActionClickEvent } from '../../common/json-tree';

import { CreateClientDialogService } from '../../components/create-client-dialog';
import { IKeyValueResponse, KeyValueDialogService } from '../../components/key-value-dialog';

@Component({
  selector: 'rdx-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent {
  constructor(
    readonly redisService: RedisService,
    private readonly _api: ApiService,
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

  activate(id: string) {
    this.redisService.activate(id);
  }

  remove(id: string) {
    this.redisService.remove(id);
  }

  onActionClick(e: IJsonTreeNodeActionClickEvent) {
    if (e.type === 'add') {
      this.openKeyValueDialog({
        key: '',
        path: [...e.node.path.slice(0, e.node.path.length - 1), ''],
        description: '',
        value: '',
      });
    } else if (e.type === 'edit') {
      this.openKeyValueDialog(e.node);
    } else if (e.type === 'copy') {
      this._api.copy(this._parse(e.node.value));
    } else {
      this._removeNode(e.node);
    }
  }

  onKeyLoad(e: IJsonTreeNode) {
    this.redisService.key(e.key);
  }

  openKeyValueDialog(node: IJsonTreeNode) {
    this._keyValueDialogService.open({
      path: node.path,
      value: node.value,
      type: node.type,
    }).result.then(v => this._onKeyValueDialogClose(node, v))
             .catch(() => undefined);
  }

  private _removeNode(node: IJsonTreeNode) {
    const id = this.redisService.getStateProp('active');
    const client = this.redisService.getStateProp('clients')[id];
    const isRoot = node.key === node.path[0];
    let value = client.map;

    for (let i = 0; i < node.path.length - 1; i++) {
      value = value[node.path[i]];
    }

    delete value[node.key];

    if (isRoot) {
      this.redisService.keyValueRemove({
        id,
        key: node.key,
      });
    } else {
      this.redisService.keyValueSet({
        id,
        key: node.path[0],
        value: client.map[node.path[0]],
      });
    }
  }

  private _parse(value: any) {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return `${value}`;
    }

    return jsonTryStringify(value, 2);
  }

  private _onKeyValueDialogClose(node: IJsonTreeNode, v: IKeyValueResponse) {
    if (v) {
      const id = this.redisService.getStateProp('active');
      const client = this.redisService.getStateProp('clients')[id];
      let value = client.map;

      for (let i = 0; i < v.path.length - 1; i++) {
        value = value[v.path[i]];
      }

      value[v.key] = v.value;

      if (node.key !== v.key) {
        delete value[node.key];
      }

      this.redisService.keyValueSet({
        id,
        key: v.path[0],
        value: client.map[v.path[0]],
      });
    }
  }
}
