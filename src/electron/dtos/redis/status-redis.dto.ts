export interface IStatusRedis {
  readonly id: string;
  readonly status: 'open' | 'reconnecting' | 'closed';
}
