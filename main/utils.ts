import { shell } from 'electron';
import { stripIndent } from 'common-tags';

const { version, homepage } = require('../package.json');
const license = require('../LICENSE.md');

export const getVersion = () => {
  const info = stripIndent`
    Version: ${version}
    Date: ${new Date().toLocaleString()}
    Electron: ${process.versions.electron}
    Chrome: ${process.versions.chrome}
    Node.js: ${process.versions.node}
    V8: ${process.versions.v8}
  `;

  return info;
};

export const getLicense = () => {
  return htmlToText.fromString(license);
};

export const openWebsite = () => {
  shell.openExternal(homepage);
};
