export interface IJsonTreeNodeExpanded {
  expanded?: boolean;
  state?: { [key: string]: IJsonTreeNodeExpanded };
}
