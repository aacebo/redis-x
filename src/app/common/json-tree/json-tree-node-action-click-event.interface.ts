import { JsonTreeNodeAction } from './json-tree-node-action.type';
import { IJsonTreeNode } from './json-tree-node.interface';

export interface IJsonTreeNodeActionClickEvent<T = any> {
  readonly type: JsonTreeNodeAction;
  readonly node: IJsonTreeNode<T>;
}
