import { IpcRendererEvent } from 'electron';

export interface IApi {
  once(event: string, cb: (e: IpcRendererEvent, data: any) => void): void;
}
