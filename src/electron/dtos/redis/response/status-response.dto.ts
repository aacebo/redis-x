export interface IRedisStatusResponse {
  readonly id: string;
  readonly status: 'open' | 'reconnecting' | 'closed';
}
