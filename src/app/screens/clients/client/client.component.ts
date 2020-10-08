import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { jsonTryStringify } from '../../../../electron/utils';
import { ApiService } from '../../../api';

import { ClientsService } from '../../../stores/clients';
import { KeysService } from '../../../stores/keys';
import { SearchService } from '../../../stores/search';

import { IJsonTreeNode, IJsonTreeNodeActionClickEvent, JsonTreeNodeType } from '../../../common/json-tree';
import { IKeyValueResponse, KeyValueDialogService } from '../../../components/key-value-dialog';
import { ConfirmDialogService } from '../../../components/confirm-dialog';

@Component({
  selector: 'rdx-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent {
  private get _id() { return this._route.snapshot.paramMap.get('id'); }
  readonly id$: Observable<string>;

  constructor(
    readonly clientsService: ClientsService,
    readonly keysService: KeysService,
    readonly searchService: SearchService,
    private readonly _api: ApiService,
    private readonly _confirmDialogService: ConfirmDialogService,
    private readonly _keyValueDialogService: KeyValueDialogService,
    private readonly _route: ActivatedRoute,
  ) {
    this.id$ = this._route.paramMap.pipe(map(v => v.get('id')));
  }

  onLoadClick(e: IJsonTreeNode) {
    this.keysService.get({ id: this._id, key: e.key });
  }

  onValueClick(node: IJsonTreeNode) {
    this._keyValueDialogService.open({
      path: node.path,
      value: node.value,
      type: node.type,
      hostType: node.hostType,
    }).then(v => this._onKeyValueDialogClose(node, v));
  }

  onActionClick(e: IJsonTreeNodeActionClickEvent) {
    if (e.type === 'add') {
      this.onValueClick({
        key: '',
        path: [...e.node.path, ''],
        description: '',
        value: '',
        type: JsonTreeNodeType.String,
        hostType: e.node.type as any,
      });
    } else if (e.type === 'edit') {
      this.onValueClick(e.node);
    } else if (e.type === 'copy') {
      this._api.copy(this._parse(e.node.value));
    } else if (e.type === 'refresh') {
      this.onLoadClick(e.node);
    } else {
      this._delete(e.node);
    }
  }

  private _parse(value: any) {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return `${value}`;
    }

    return jsonTryStringify(value, 2);
  }

  private _delete(node: IJsonTreeNode) {
    this._confirmDialogService.open('are you sure you want to delete this node?')
      .then(v => this._onDeleteConfirmDialogClose(node, v));
  }

  private _onKeyValueDialogClose(node: IJsonTreeNode, v: IKeyValueResponse) {
    if (v) {
      const keys = this.keysService.getClientKeys(this._id);
      let value = keys;

      for (let i = 0; i < v.path.length - 1; i++) {
        value = value[v.path[i]];
      }

      value[v.key] = v.value;

      if (node.key !== v.key) {
        delete value[node.key];
      }

      this.keysService.set({
        id: this._id,
        key: v.path[0],
        value: keys[v.path[0]],
      });
    }
  }

  private _onDeleteConfirmDialogClose(node: IJsonTreeNode, confirmed?: boolean) {
    if (confirmed) {
      const isRoot = node.key === node.path[0];
      const keys = this.keysService.getClientKeys(this._id);
      let value = keys;

      for (let i = 0; i < node.path.length - 1; i++) {
        value = value[node.path[i]];
      }

      if (Array.isArray(value)) {
        value.splice(+node.key, 1);
      } else {
        delete value[node.key];
      }

      if (isRoot) {
        this.keysService.delete({
          id: this._id,
          key: node.key,
        });
      } else {
        this.keysService.set({
          id: this._id,
          key: node.path[0],
          value: keys[node.path[0]],
        });
      }
    }
  }
}
