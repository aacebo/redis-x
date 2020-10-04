import { app, ipcMain, IpcMainEvent } from 'electron';
import { autoUpdater } from 'electron-updater';
import { promisify } from 'util';

import Logger from './logger';
import * as dtos from './dtos/updater';

class Updater {
  private readonly _autoUpdaterOnce = promisify(autoUpdater.once);
  private readonly _logger = new Logger('Updater');

  constructor() {
    autoUpdater.logger = this._logger;
    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;
    autoUpdater.setFeedURL({
      provider: 'github',
      repo: 'redis-x',
      owner: 'aacebo',
      private: true,
      token: process.env.GH_TOKEN,
    });

    ipcMain.on('updater:check', this.check.bind(this));
    ipcMain.on('updater:install', this.install.bind(this));

    if (!process.env.GH_TOKEN) {
      this._logger.warn('updating disabled, no token found');
    }
  }

  async check(e: IpcMainEvent) {
    if (process.env.GH_TOKEN) {
      const update = await autoUpdater.checkForUpdates();
      const version =  app.getVersion();
      const available = version !== update.updateInfo.version;

      if (available) {
        await this._autoUpdaterOnce('update-downloaded');
      }

      e.sender.send('updater:check.return', { available } as dtos.IUpdaterCheckResponse);
    }
  }

  async install(_: IpcMainEvent) {
    if (process.env.GH_TOKEN) {
      autoUpdater.quitAndInstall();
    }
  }
}

export default new Updater();
