import { shell } from 'electron';
import { stripIndent } from 'common-tags';
import htmlToText from 'html-to-text';

export const ipcSender = (channel: string, ...args: any[]) => (
  menuItem: Electron.MenuItem,
  browserWindow: Electron.BrowserWindow,
  event: Event,
) => {
  browserWindow.webContents.send(channel, ...args);
};

export const getVersion = () => {
  const info = stripIndent`
    Version: ${require('../../package.json').version}
    Date: ${new Date().toLocaleString()}
    Electron: ${process.versions.electron}
    Chrome: ${process.versions.chrome}
    Node.js: ${process.versions.node}
    V8: ${process.versions.v8}
  `;

  return info;
};

export const getLicense = () => {
  return htmlToText.fromString(require('../../LICENSE.md'));
};

export const openWebsite = () => {
  shell.openExternal(require('../../package.json').homepage);
};
