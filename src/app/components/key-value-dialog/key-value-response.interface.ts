export interface IKeyValueResponse<T = any> {
  readonly path: string[];
  readonly key: string;
  readonly value: T;
}
