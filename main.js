'use strict';

const { app, BrowserWindow, dialog, ipcMain, Menu } = require('electron');
const file = require('./src/utils/file');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1200, height: 800});

  // and load the index.html of the app.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('file://' + __dirname + '/src/index.html');
  } else if (process.env.NODE_ENV === 'production') {
    mainWindow.loadURL('file://' + __dirname + '/index.html');
  }

  // Open the DevTools.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  createWindow();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Set up application menu.
let template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New File',
        accelerator: 'CmdOrCtrl+N',
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            file.fileNew();
          }
        }
      },
      {
        label: 'Open File',
        accelerator: 'CmdOrCtrl+O',
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            dialog.showOpenDialog({
              properties: ['fileOpen'],
              filters: [
                { name: 'Caption Files', extensions: ['srt', 'smi', 'vtt'] }
              ]}, (filenames) => {
              file.fileOpen(filenames[0]);
            });
          }
        }
      },
      {
        label: 'Open Video',
        accelerator: 'CmdOrCtrl+Shift+O',
        click: (item, focusedWindow) => {
          if(focusedWindow) {
            dialog.showOpenDialog({
              properties: ['fileOpen'],
              filters: [
                { name: 'Video Files', extensions: ['mp4', 'webm', 'ogg'] }
              ]}, (filenames) => {
              file.fileOpen(filenames[0]);
            });
          }
        }
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            mainWindow.webContents.send('file-state-req');
            ipcMain.on('file-state-res', (event, state, filename) => {
              if(state == 'unsaved') {
                dialog.showSaveDialog({
                  filters: [
                    { name: 'SubRip', extensions: ['srt'] },
                    { name: 'WebVTT', extensions: ['vtt'] },
                    { name: 'SAMI', extensions: ['smi'] }
                  ]}, (filename) => {
                  file.fileSave(filename);
                });
              } else if(state == 'saved') {
                file.fileSave(filename);
              }
            });
          }
        }
      },
      {
        label: 'Save As',
        accelerator: 'CmdOrCtrl+Shift+S',
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            dialog.showSaveDialog({
              filters: [
                { name: 'SubRip', extensions: ['srt'] },
                { name: 'WebVTT', extensions: ['vtt'] },
                { name: 'SAMI', extensions: ['smi'] }
              ]}, (filename) => {
              file.fileSave(filename);
            });
          }
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: (item, focusedWindow) => {
          if (focusedWindow)
            focusedWindow.reload();
        }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: (() => {
          if (process.platform == 'darwin')
            return 'Ctrl+Command+F';
          else
            return 'F11';
        })(),
        click: (item, focusedWindow) => {
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: (() => {
          if (process.platform == 'darwin')
            return 'Alt+Command+I';
          else
            return 'Ctrl+Shift+I';
        })(),
        click: (item, focusedWindow) => {
          if (focusedWindow)
            focusedWindow.toggleDevTools();
        }
      }
    ]
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }
    ]
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: () => { require('electron').shell.openExternal('http://electron.atom.io'); }
      }
    ]
  }
];
if (process.platform == 'darwin') {
  var name = require('electron').remote.app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Alt+H',
        role: 'hideothers'
      },
      {
        label: 'Show All',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: () => { app.quit(); }
      }
    ]
  });
  // Window menu.
  template[3].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  );
}
