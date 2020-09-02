import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld(
  'api',
  {
    once: (event: string, cb: (e: IpcRendererEvent, data: any) => void) => {
      ipcRenderer.once(event, cb);
    },
  },
);
