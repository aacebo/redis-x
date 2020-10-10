import { IJsonTreeNode } from './json-tree-node.interface';
import { JsonTreeNodeType } from './json-tree-node-type.enum';

export function parseJsonTreeNode(
  hostType: JsonTreeNodeType.Object | JsonTreeNodeType.Array,
  path: string[],
  key: string,
  value: any,
) {
  const type = typeof value;
  const node: IJsonTreeNode = {
    path: [...path, key],
    key,
    value,
    type: JsonTreeNodeType.Undefined,
    hostType,
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
      node.description = `(${value.length}) [ ${value.length > 0 ? '...' : ''} ]`;
    } else if (value instanceof Date) {
      node.type = JsonTreeNodeType.Date;
    } else {
      const length = Object.keys(value).length;
      node.type = JsonTreeNodeType.Object;
      node.description = `(${length}) { ${length > 0 ? '...' : ''} }`;
    }
  }

  node.expandable = node.type === JsonTreeNodeType.Object ||
                    node.type === JsonTreeNodeType.Array;

  return node;
}
