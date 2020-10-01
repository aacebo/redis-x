export interface IKeyValueGetResponse<T = any> {
  readonly id: string;
  readonly key: string;
  readonly value: T;
}
