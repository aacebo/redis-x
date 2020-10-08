import { JsonTreeNodeType } from './json-tree-node-type.enum';
import { IJsonTreeNode } from './json-tree-node.interface';
import { parseJsonTreeNode } from './parse-json-tree-node.util';

export function parseJsonTreeNodes(path: string[], json?: any, filter?: string) {
  const nodes: IJsonTreeNode[] = [];

  if (typeof json === 'object') {
    for (const key of Object.keys(json)) {
      nodes.push(parseJsonTreeNode(Array.isArray(json) ? JsonTreeNodeType.Array : JsonTreeNodeType.Object, path, key, json[key], filter));
    }
  } else {
    this.nodes = [parseJsonTreeNode(JsonTreeNodeType.Object, path, `(${typeof this.json})`, this.json, filter)];
  }

  return nodes;
}
