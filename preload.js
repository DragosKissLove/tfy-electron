const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  runPythonFunction: (funcName) => ipcRenderer.invoke('run-python-function', funcName),
});
