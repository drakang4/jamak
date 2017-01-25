import { BrowserWindow, dialog, ipcMain, remote } from 'electron';
import fs from 'fs';

import { subtitleTypes, videoTypes } from '../src/constants/fileTypes';

const readFileData = (filePath) => {
  fs.readFile(filePath, (err, data) => {
    if (err) throw err;
    return data;
  });
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
  dialog.showOpenDialog({
    properties: ['fileOpen'],
    filters: [
      { name: 'Subtitle Files', extensions: subtitleTypes },
      { name: 'All Files', extensions: ['*'] },
    ],
  }, (filePaths) => {
    if (filePaths) {
      browserWindow.webContents.send('open-file', readFileData(filePaths[0]));
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
  dialog.showOpenDialog({
    properties: ['fileOpen'],
    filters: [
      { name: 'Video Files', extensions: videoTypes },
      { name: 'All Files', extensions: ['*'] },
    ],
  }, (filePaths) => {
    if (filePaths) {
      browserWindow.webContents.send('open-video', filePaths[0]);
    }
  });
};

ipcMain.on('ask-open-file', (event, filePath) => {
  event.sender.send('open-file', readFileData(filePath));
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

ipcMain.on('save-file-as', (event, data) => {
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
