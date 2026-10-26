const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');

// Persistent profile is stored in %APPDATA% and survives application upgrades.
app.setName('Finanças Pessoais');
app.setPath('userData', path.join(app.getPath('appData'), 'FinancasPessoais'));
app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 1280, height: 850, minWidth: 900, minHeight: 650,
    autoHideMenuBar: true,
    webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: true,
      partition: 'persist:financas-pessoais' }
  });
  win.webContents.setWindowOpenHandler(({url}) => {
    if (/^https:\/\//i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.loadFile(path.join(__dirname, 'index.html'));
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
