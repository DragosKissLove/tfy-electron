const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');
const store = new Store();

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();

  // Handle IPC calls
  ipcMain.handle('run-function', async (event, { name, args }) => {
    try {
      switch (name) {
        case 'check-updates':
          return await checkForUpdates();
        case 'clean-temp':
          return await cleanTemp();
        case 'run-optimization':
          return await runOptimization();
        case 'download-roblox':
          return await downloadRobloxPlayer(args.version);
        default:
          throw new Error('Function not found');
      }
    } catch (error) {
      console.error('Error:', error);
      return { error: error.message };
    }
  });

  // Handle settings storage
  ipcMain.handle('get-settings', () => {
    return store.get('settings');
  });

  ipcMain.handle('save-settings', (event, settings) => {
    store.set('settings', settings);
    return true;
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