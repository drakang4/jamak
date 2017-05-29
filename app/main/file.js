const { BrowserWindow, dialog, ipcMain } = require('electron');
const fs = require('fs');

const { subtitleTypes, videoTypes } = require('../renderer/constants/fileTypes');

const readFileData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return data;
};

const writeFileData = (data, filePath) => {
  fs.writeFile(filePath, data, (err) => {
    if (err) throw err;
  });
};

export const newFile = (browserWindow) => {
  browserWindow.webContents.send('new-file');
};

export const openFile = (browserWindow) => {
  const filters = [
    { name: 'Subtitle Files', extensions: subtitleTypes },
  ];
  if (process.platform === 'win32') {
    filters.push({ name: 'All Files', extensions: ['*'] });
  }
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: filters,
  }, (filePaths) => {
    if (filePaths) {
      browserWindow.webContents.send('open-file', filePaths[0], readFileData(filePaths[0]));
    }
  });
};

export const saveFile = (browserWindow) => {
  browserWindow.webContents.send('ask-save-file');
};

export const saveAsFile = (browserWindow) => {
  browserWindow.webContents.send('ask-save-as-file');
};

export const openVideo = (browserWindow) => {
  const filters = [
    { name: 'Video Files', extensions: videoTypes },
  ];
  if (process.platform === 'win32') {
    filters.push({ name: 'All Files', extensions: ['*'] });
  }
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: filters,
  }, (filePaths) => {
    if (filePaths) {
      browserWindow.webContents.send('open-video', filePaths[0]);
    }
  });
};

ipcMain.on('ask-open-file', (event, filePath) => {
  event.sender.send('open-file', filePath, readFileData(filePath));
});

ipcMain.on('ask-open-video', (event, filePath) => {
  event.sender.send('open-video', filePath);
});

ipcMain.on('ask-open-file-dialog', (event) => {
  openFile(BrowserWindow.getFocusedWindow());
});

ipcMain.on('ask-open-video-dialog', (event) => {
  openVideo(BrowserWindow.getFocusedWindow());
});

ipcMain.on('save-file', (event, data, filePath) => {
  writeFileData(data, filePath);
});

ipcMain.on('save-as-file', (event, data) => {
  dialog.showSaveDialog({
    filters: [
      { name: 'SubRip', extensions: ['srt'] },
      { name: 'WebVTT', extensions: ['vtt'] },
      { name: 'SAMI', extensions: ['smi'] },
    ],
  }, (filename) => {
    writeFileData(data, filename);
  });
});
