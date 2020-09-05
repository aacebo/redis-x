import { JsonTreeNodeType } from '../json-tree';

export interface IKeyValueData<T = any> {
  readonly path: string[];
  readonly value: T;
  readonly type: JsonTreeNodeType;
}
