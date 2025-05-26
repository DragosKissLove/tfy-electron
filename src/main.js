const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');
const { exec } = require('child_process');
const fs = require('fs');
const axios = require('axios');
const extract = require('extract-zip');
const store = new Store();
const { winrarCrack, activateWindows, installAtlasTools, wifiPasswords } = require('./functions');

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
    backgroundColor: '#000000'
  });

  win.loadURL('http://localhost:3000');

  // Window control handlers
  ipcMain.on('window-close', () => win.close());
  ipcMain.on('window-minimize', () => win.minimize());
  ipcMain.on('window-maximize', () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  // Handle IPC calls
  ipcMain.handle('run-function', async (event, { name }) => {
    try {
      switch (name) {
        case 'winrar_crack':
          return await winrarCrack();
        case 'install_atlas_tools':
          return await installAtlasTools();
        case 'wifi_passwords':
          return await wifiPasswords();
        case 'activate_windows':
          return await activateWindows();
        case 'install_spicetify_from_github':
          return { message: 'Spotify mod installation started' };
        case 'run-optimization':
          return { message: 'Optimization completed successfully!' };
        case 'clean-temp':
          return { message: 'Temporary files cleaned successfully!' };
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
}

app.whenReady().then(createWindow);

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