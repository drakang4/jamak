import { dialog } from 'electron';
import { readSubtitleFile } from './subtitleFileIO';

const videoFilters: Electron.FileFilter[] = [
  { name: 'Video Files', extensions: ['mp4'] },
  { name: 'All Files', extensions: ['*'] },
];

const subtitleFilters: Electron.FileFilter[] = [
  { name: 'Subtitle Files', extensions: ['srt', 'vtt'] },
  { name: 'All Files', extensions: ['*'] },
];

export const openVideoDialog = (webContents: Electron.WebContents) => {
  const paths = dialog.showOpenDialog({
    filters: videoFilters,
    properties: ['openFile'],
  });

  if (!Array.isArray(paths) || paths.length === 0) {
    return;
  }

  if (paths.length > 1) {
    console.log('only support one file');
  }

  webContents.send('open-video', paths[0]);
};

export const openSubtitleDialog = async (webContents: Electron.WebContents) => {
  try {
    const paths = dialog.showOpenDialog({
      filters: subtitleFilters,
      properties: ['openFile'],
    });

    if (!Array.isArray(paths) || paths.length === 0) {
      return;
    }

    if (paths.length > 1) {
      console.log('only support one file');
    }

    const subtitles = await readSubtitleFile(paths[0]);

    webContents.send('open-subtitle', paths[0], subtitles);
  } catch (error) {
    dialog.showErrorBox('error', error);
  }
};

export const saveAsSubtitleDialog = (webContents: Electron.WebContents) => {
  const path = dialog.showSaveDialog({
    filters: subtitleFilters,
  });

  if (!path) {
    return;
  }

  webContents.send('save-subtitle', path);
};
