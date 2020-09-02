import { IRedisClient } from './redis-client.interface';

export interface IRedis {
  readonly clients: { [id: string]: IRedisClient };
}
