import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICreateRedis, IStatusRedis } from '../../../electron/dtos/redis';
import { ApiService } from '../../api';

import { IStore } from '../store.interface';
import { IRedis } from './redis.interface';
import { IRedisClient } from './redis-client.interface';

@Injectable({
  providedIn: 'root',
})
export class RedisService implements IStore<IRedis> {
  get clients$() { return this.value$.pipe(map(v => Object.values(v.clients))); }

  get value$() { return this._value$.asObservable(); }
  private readonly _value$ = new BehaviorSubject<IRedis>({
    clients: { },
  });

  constructor(private readonly _apiService: ApiService) {
    this._apiService.on<IStatusRedis>('redis:status', (_, status) => {
      const client = this._value$.value.clients[status.id];

      this._value$.next({
        ...this._value$.value,
        clients: {
          [status.id]: {
            ...client,
            status: status.status,
          },
        },
      });
    });
  }

  create(v: ICreateRedis) {
    this._apiService.once<IRedisClient>('redis:create.return', (_, client) => {
      this._value$.next({
        ...this._value$.value,
        clients: {
          [client.id]: client,
        },
      });
    });

    this._apiService.send('redis:create', v);
  }
}
