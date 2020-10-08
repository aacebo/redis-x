import { JsonTreeNodeType } from './json-tree-node-type.enum';

export interface IJsonTreeNode<T = any> {
  readonly path: string[];
  readonly key: string;
  readonly value?: T;

  type: JsonTreeNodeType;
  hostType: JsonTreeNodeType.Object | JsonTreeNodeType.Array;
  description: string;
  expandable?: boolean;
  visible?: boolean;
}
