import { app, BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';
import rimraf from 'rimraf';
import mkdirp from 'mkdirp';
import axios from 'axios';
import { promisify } from 'util';
import unzip from 'unzip-crx';

const installExtension = async (extensionID: string) => {
  try {
    const url = `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=49.0&x=id%3D${extensionID}%26installsource%3Dondemand%26uc`;
    const extensionPath = path.resolve(app.getPath('temp'), 'extensions');
    const downloadPath = path.resolve(extensionPath, `${extensionID}.crx`);
    const unzipPath = path.resolve(extensionPath, extensionID);

    rimraf.sync(unzipPath);
    mkdirp.sync(unzipPath);

    const res = await axios.get<ArrayBuffer>(url, {
      responseType: 'arraybuffer',
    });

    const buffer = Buffer.from(res.data);

    await promisify(fs.writeFile)(downloadPath, buffer, { encoding: null });
    await unzip(downloadPath, unzipPath);

    BrowserWindow.addDevToolsExtension(unzipPath);
  } catch (error) {
    console.error(error);
  }
};

const REACT_DEVTOOLS = 'fmkadmapgofadopljbjfkapdkoienihi';
const REDUX_DEVTOOLS = 'lmhkpmbekcpmknklioeibfkpmmfibljd';

export default installExtension;
export { REACT_DEVTOOLS, REDUX_DEVTOOLS };
