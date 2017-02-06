import { ipcRenderer } from 'electron';
import { fromSrt, toSrt } from './srtParser';
import * as actions from '../actions/file';
import { setData } from '../actions/blocks';

const ipcManager = (store) => {
  ipcRenderer.on('new-file', (event) => {
    store.dispatch(actions.newFile());
    store.dispatch(setData([]));
  });

  ipcRenderer.on('open-file', (event, filePath, data) => {
    store.dispatch(actions.loadFile(filePath));
    store.dispatch(setData(fromSrt(data)));
  });

  ipcRenderer.on('open-video', (event, videoPath) => {
    store.dispatch(actions.loadVideo(videoPath));
  });

  ipcRenderer.on('ask-save-file', (event) => {
    const data = store.getState().blocks.blocks;
    const filePath = store.getState().blocks.blockFilePath;

    if (!filePath) {
      ipcRenderer.send('save-as-file', toSrt(data));
    } else {
      ipcRenderer.send('save-file', toSrt(data), filePath);
    }
  });

  ipcRenderer.on('ask-save-as-file', (event) => {
    const data = toSrt(store.getState().blocks.blocks);

    ipcRenderer.send('save-as-file', toSrt(data));
  });
};

export default ipcManager;
