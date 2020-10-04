import { dialog, app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';

import Logger from './logger';

autoUpdater.logger = new Logger('Updater');

export default class Updater {
  constructor(private readonly _window: BrowserWindow) {
    autoUpdater.setFeedURL({
      provider: 'github',
      repo: 'redis-x',
      owner: 'aacebo',
      private: true,
      token: process.env.GH_TOKEN,
    });

    this.check(this._window);
  }

  async check(window: BrowserWindow, manual = false) {
    if (process.env.GH_TOKEN) {
      const update = await autoUpdater.checkForUpdates();
      const version =  app.getVersion();

      if (manual && update.updateInfo.version === version) {
        await dialog.showMessageBox(window, {
          message: 'Your Up To Date!',
          detail: 'Thanks for keeping Redis-X updated.',
        });
      } else if (update.updateInfo.version !== version) {
        const choice = await dialog.showMessageBox(window, {
          message: 'Update Available',
          detail: 'A newer version of Redis-X is available, would you list to update?',
          buttons: ['Update', 'Cancel'],
        });

        if (choice.response === 0) {
          await autoUpdater.downloadUpdate();
        }
      }
    }
  }
}
