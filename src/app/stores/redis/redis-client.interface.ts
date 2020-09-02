export interface IRedisClient {
  readonly id: string;
  readonly host: string;
  readonly port: number;
  readonly status: 'open' | 'reconnecting' | 'closed';
}
