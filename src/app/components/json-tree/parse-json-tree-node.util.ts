import { IJsonTreeNode } from './json-tree-node.interface';
import { JsonTreeNodeType } from './json-tree-node-type.enum';

export function parseJsonTreeNode(path: string[], key: string, value: any) {
  const type = typeof value;
  const node: IJsonTreeNode = {
    path: [...path, key],
    key,
    value,
    description: `${value}`,
  };

  if (type === 'number' || type === 'bigint') {
    node.type = JsonTreeNodeType.Number;
  } else if (type === 'string') {
    node.type = JsonTreeNodeType.String;
    node.description = `"${value}"`;
  } else if (type === 'boolean') {
    node.type = JsonTreeNodeType.Boolean;
  } else if (type === 'function') {
    node.type = JsonTreeNodeType.Function;
  } else if (type === 'undefined') {
    node.type = JsonTreeNodeType.Undefined;
    node.description = 'undefined';
  } else if (type === 'object') {
    if (value === null) {
      node.type = JsonTreeNodeType.Null;
      node.description = 'null';
    } else if (Array.isArray(value)) {
      node.type = JsonTreeNodeType.Array;
      node.description = JSON.stringify(value, undefined, 2);
    } else if (value instanceof Date) {
      node.type = JsonTreeNodeType.Date;
    } else {
      node.type = JsonTreeNodeType.Object;
      node.description = JSON.stringify(value, undefined, 2);
    }
  }

  node.expandable = node.type === JsonTreeNodeType.Object ||
                    node.type === JsonTreeNodeType.Array;

  return node;
}
