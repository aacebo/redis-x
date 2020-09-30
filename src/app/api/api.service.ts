import { Injectable, NgZone } from '@angular/core';
import { IpcRendererEvent } from 'electron';

import { IApi } from './api.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements IApi {
  private readonly _api: IApi = (window as any).api;

  constructor(private readonly _zone: NgZone) { }

  once<T = any>(event: string, cb: (e: IpcRendererEvent, data: T) => void) {
    this._api.once(event, (e, data: T) => {
      this._zone.run(() => cb(e, data));
    });
  }

  on<T = any>(event: string, cb: (e: IpcRendererEvent, data: T) => void) {
    this._api.on(event, (e, data: T) => {
      this._zone.run(() => cb(e, data));
    });
  }

  send<T = any>(event: string, data?: T) {
    this._api.send(event, data);
  }

  copy(data: string) {
    this._api.copy(data);
  }
}
