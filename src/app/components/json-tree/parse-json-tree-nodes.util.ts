import { IJsonTreeNode } from './json-tree-node.interface';
import { parseJsonTreeNode } from './parse-json-tree-node.util';

export function parseJsonTreeNodes(json?: any) {
  const nodes: IJsonTreeNode[] = [];

  if (typeof json === 'object') {
    for (const key of Object.keys(json)) {
      nodes.push(parseJsonTreeNode(key, json[key]));
    }
  } else {
    this.nodes = [parseJsonTreeNode(`(${typeof this.json})`, this.json)];
  }

  return nodes;
}
