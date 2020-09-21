import { JsonTreeNodeType } from './json-tree-node-type.enum';

export interface IJsonTreeNode<T = any> {
  readonly path: string[];
  readonly key: string;
  readonly value?: T;
  type?: JsonTreeNodeType;
  description: string;
  expandable?: boolean;
}
