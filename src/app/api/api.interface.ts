import { IpcRendererEvent } from 'electron';

export interface IApi {
  once<T = any>(event: string, cb: (e: IpcRendererEvent, data: T) => void): void;
  on<T = any>(event: string, cb: (e: IpcRendererEvent, data: T) => void): void;
  send<T = any>(event: string, data: T): void;
  copy(data: string): void;
}
