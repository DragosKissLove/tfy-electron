const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const functions = require('./functions'); // <-- importă funcțiile

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
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


