const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const functions = require('./functions');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('run-python-function', async (event, funcName) => {
    try {
      const func = functions[funcName];
      if (func) {
        const result = await func();
        return result;
      } else {
        throw new Error('Function not found');
      }
    } catch (error) {
      return `❌ Error: ${error.message}`;
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});