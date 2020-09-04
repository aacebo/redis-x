export interface IKeyValueData<T = any> {
  readonly path: string[];
  readonly value: T;
}
