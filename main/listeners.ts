import { ipcMain } from 'electron';
import {
  openVideoDialog,
  openSubtitleDialog,
  saveAsSubtitleDialog,
} from './fileDialogs';
import { writeSubtitleFile } from './subtitleFileIO';

export function createMessageListeners(webContents: Electron.WebContents) {
  ipcMain.on('request-open-video-dialog', () => {
    openVideoDialog(webContents);
  });

  ipcMain.on('request-open-subtitle-dialog', () => {
    openSubtitleDialog(webContents);
  });

  ipcMain.on('request-save-as-subtitle-dialog', () => {
    saveAsSubtitleDialog(webContents);
  });

  ipcMain.on(
    'request-save-subtitle',
    async (event: Event, filepath: string, data: any) => {
      await writeSubtitleFile(filepath, data);
    },
  );
}
