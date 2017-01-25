import { dialog } from 'electron';

import file from '../src/utils/file';

const template = [
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
        },
      },
      {
        label: 'Open File',
        accelerator: 'CmdOrCtrl+O',
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            dialog.showOpenDialog({
              properties: ['fileOpen'],
              filters: [
                { name: 'Caption Files', extensions: ['srt', 'smi', 'vtt'] },
                { name: 'All Files', extensions: ['*'] },
              ],
            }, (filenames) => {
              if (filenames) {
                file.fileOpen(filenames[0]);
              }
            });
          }
        },
      },
      {
        label: 'Open Video',
        accelerator: 'CmdOrCtrl+Shift+O',
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            dialog.showOpenDialog({
              properties: ['fileOpen'],
              filters: [
                { name: 'Video Files', extensions: ['mp4', 'webm', 'ogg'] },
                { name: 'All Files', extensions: ['*'] },
              ],
            }, (filenames) => {
              if (filenames) {
                file.fileOpen(filenames[0]);
              }
            });
          }
        },
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
        label: 'GitHub',
        click: () => { require('electron').shell.openExternal('https://github.com/Heeryong-Kang/jamak'); }
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

if (process.env.NODE_ENV === 'development') {
  template[2].submenu.push(
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
  );
}

export default template;
