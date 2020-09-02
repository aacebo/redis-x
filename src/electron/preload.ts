import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld(
  'api',
  {
    once: (event: string, cb: (e: IpcRendererEvent, data: any) => void) => {
      ipcRenderer.once(event, cb);
    },
    on: (event: string, cb: (e: IpcRendererEvent, data: any) => void) => {
      ipcRenderer.on(event, cb);
    },
    send: (event: string, data: any) => {
      ipcRenderer.send(event, data);
    },
  },
);
