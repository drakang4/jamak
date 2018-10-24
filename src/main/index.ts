import { app, BrowserWindow } from 'electron';
// import installExtension, { REACT_DEVTOOLS } from './installExtension';

import { createMenu } from './menu';
import { createMessageListeners } from './listeners';

declare var APP_WEBPACK_ENTRY: string;
// declare var APP_PRELOAD_WEBPACK_ENTRY: string;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null;

const isDevMode = process.env.NODE_ENV === 'development';

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    title: 'Jamak',
    backgroundColor: '#212529',
    webPreferences: {
      webSecurity: false,
      experimentalCanvasFeatures: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(APP_WEBPACK_ENTRY);

  // Open the DevTools.
  if (isDevMode) {
    try {
      // await installExtension(REACT_DEVTOOLS);
      mainWindow.webContents.openDevTools();
    } catch (error) {
      console.error(error);
    }
  }

  await createMenu();

  createMessageListeners(mainWindow.webContents);

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
app.on('ready', async () => {
  createWindow();
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
