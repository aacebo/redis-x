export interface IKeyValueSetRequest<T = any> {
  readonly id: string;
  readonly key: string;
  readonly value: T;
}
