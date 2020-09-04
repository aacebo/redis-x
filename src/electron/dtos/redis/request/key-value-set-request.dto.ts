export interface IRedisKeyValueSetRequest<T = any> {
  readonly path: string[];
  readonly value: T;
}
