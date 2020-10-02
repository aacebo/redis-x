import * as electron from 'electron';
import * as dev from 'electron-is-dev';
import * as path from 'path';
import * as url from 'url';

import './redis';
import Database from './database';
import Logger from './logger';

let app: App;

class App {
  private _window: electron.BrowserWindow;
  private readonly _height = 600;
  private readonly _width = 900;

  private get _system() {
    return {
      pid: process.pid,
      platform: process.platform,
      version: electron.app.getVersion(),
      build: dev ? 'development' : 'production',
      fullscreen: this._window.isFullScreen(),
    };
  }

  constructor() {
    Database.instance.start();

    const cursor = electron.screen.getCursorScreenPoint();
    const { bounds } = electron.screen.getDisplayNearestPoint(cursor);

    this._window = new electron.BrowserWindow({
      title: 'RedisX',
      width: this._width,
      height: this._height,
      minWidth: 600,
      minHeight: 600,
      x: bounds.x + ((bounds.width - this._width) / 2),
      y: bounds.y + ((bounds.height - this._height) / 2),
      autoHideMenuBar: false,
      darkTheme: true,
      show: false,
      frame: process.platform === 'darwin' ? false : true,
      titleBarStyle: process.platform === 'darwin' ? 'hidden' : 'default',
      backgroundColor: '#424242',
      webPreferences: {
        nodeIntegration: true,
        backgroundThrottling: false,
        worldSafeExecuteJavaScript: true,
        contextIsolation: true,
        preload: `${__dirname}/preload.js`,
      },
    });

    this._window.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    }));

    this._window.webContents.on('dom-ready', this._onDomReady.bind(this));
    this._window.on('enter-full-screen', () => this._window.webContents.send('system', this._system));
    this._window.on('leave-full-screen', () => this._window.webContents.send('system', this._system));
    this._window.on('closed', () => this._window = null);
  }

  private _onDomReady() {
    this._window.show();
    this._window.webContents.send('system', this._system);

    Logger.info('App', 'DOM ready');

    if (dev) {
      this._window.webContents.openDevTools();
    }
  }
}

electron.app.on('ready', () => {
  app = new App();
});

electron.app.on('window-all-closed', () => {
  electron.app.quit();
});

electron.app.on('activate', () => {
  if (!app) {
    app = new App();
  }
});
