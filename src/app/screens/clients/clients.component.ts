import { Component, ChangeDetectionStrategy } from '@angular/core';

import { jsonTryStringify } from '../../../electron/utils';

import { ClientsService } from '../../stores/clients';
import { KeysService } from '../../stores/keys';
import { InfoService } from '../../stores/info';

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
    readonly clientsService: ClientsService,
    readonly keysService: KeysService,
    private readonly _infoService: InfoService,
    private readonly _api: ApiService,
    private readonly _createClientDialogService: CreateClientDialogService,
    private readonly _keyValueDialogService: KeyValueDialogService,
  ) { }

  create() {
    this._createClientDialogService.open().result.then(v => {
      if (v) {
        this.clientsService.create(v);
      }
    }).catch(() => undefined);
  }

  activate(id: string) {
    this.clientsService.activate(id);
  }

  remove(id: string) {
    this.clientsService.remove(id);
    this.keysService.remove(id);
    this._infoService.remove(id);
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
      this._deleteNode(e.node);
    }
  }

  onKeyLoad(e: IJsonTreeNode) {
    this.keysService.get(this.clientsService.getStateProp('active'), e.key);
  }

  openKeyValueDialog(node: IJsonTreeNode) {
    this._keyValueDialogService.open({
      path: node.path,
      value: node.value,
      type: node.type,
    }).result.then(v => this._onKeyValueDialogClose(node, v))
             .catch(() => undefined);
  }

  private _deleteNode(node: IJsonTreeNode) {
    const isRoot = node.key === node.path[0];
    const id = this.clientsService.getStateProp('active');
    const keys = this.keysService.getClientKeys(id);
    let value = keys;

    for (let i = 0; i < node.path.length - 1; i++) {
      value = value[node.path[i]];
    }

    delete value[node.key];

    if (isRoot) {
      this.keysService.delete({
        id,
        key: node.key,
      });
    } else {
      this.keysService.set({
        id,
        key: node.path[0],
        value: keys[node.path[0]],
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
      const id = this.clientsService.getStateProp('active');
      const keys = this.keysService.getClientKeys(id);
      let value = keys;

      for (let i = 0; i < v.path.length - 1; i++) {
        value = value[v.path[i]];
      }

      value[v.key] = v.value;

      if (node.key !== v.key) {
        delete value[node.key];
      }

      this.keysService.set({
        id,
        key: v.path[0],
        value: keys[v.path[0]],
      });
    }
  }
}
