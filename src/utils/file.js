const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');


function getBrowserWindow() {
  if(process.type == 'browser') {
    const { BrowserWindow } = require('electron');
    return BrowserWindow;
  } else if(process.type == 'renderer') {
    const { BrowserWindow } = require('electron').remote;
    return BrowserWindow;
  }
  else {
    console.log('err');
  }
}

exports.fileNew = () => {
  var mainWindow = getBrowserWindow().getFocusedWindow();
  mainWindow.webContents.send('file-new');
};

exports.fileOpen = (filenames) => {
  var mainWindow = getBrowserWindow().getFocusedWindow();
  if (filenames === undefined) return;

  var filename = filenames[0];
  var type = path.extname(filename);

  switch (type) {
    case '.srt':
      fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) throw err;
        mainWindow.webContents.send('file-open', data, filename);
      });
      break;
    case '.smi':
      break;
    case '.vtt':
      break;
    case '.mp4':
      mainWindow.webContents.send('video-open', filename);
      break;
    case '.webm':
      break;
    case '.ogg':
      break;
    default:
      break;
  }
};

exports.fileSave = (filename) => {
  var mainWindow = getBrowserWindow().getFocusedWindow();
  if (filename === undefined) return;

  mainWindow.webContents.send('file-save-req', filename);
  ipcMain.on('file-save-res', (event, data) => {
    fs.writeFile(filename, data, 'utf8', (err) => {
      if (err) throw err;
    });
  });
};
