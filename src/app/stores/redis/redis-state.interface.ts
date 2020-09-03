import { IRedisClient } from './redis-client.interface';

export interface IRedisState {
  readonly active?: string;
  readonly clients: {
    [id: string]: IRedisClient;
  };
}
