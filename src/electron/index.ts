import * as electron from 'electron';
import * as dev from 'electron-is-dev';
import * as path from 'path';
import * as url from 'url';

function getSystem() {
  return {
    pid: process.pid,
    platform: process.platform,
    version: electron.app.getVersion(),
    build: dev ? 'development' : 'production',
  };
}

let app: App;

class App {
  private _window: electron.BrowserWindow;

  constructor() {
    this._window = new electron.BrowserWindow({
      title: 'RedisX',
      width: 900,
      height: 600,
      minWidth: 600,
      minHeight: 600,
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
      },
    });

    this._window.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    }));

    this._window.webContents.on('dom-ready', this._onDomReady.bind(this));
    this._window.on('enter-full-screen', () => this._window.webContents.send('fullscreen', true));
    this._window.on('leave-full-screen', () => this._window.webContents.send('fullscreen', false));
    this._window.on('closed', () => this._window = null);
  }

  private _onDomReady() {
    this._window.show();
    this._window.webContents.send('system', getSystem());
    this._window.webContents.send('fullscreen', this._window.isFullScreen());

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
