import { ipcRenderer } from 'electron';
import { fromSrt, toSrt } from './srtParser';

const ipcManager = (store) => {
  ipcRenderer.on('new-file', (event) => {
    store.dispatch(/*New file action*/)
  });

  ipcRenderer.on('open-file', (event, data) => {
    fromSrt(data);
    store.dispatch(/*File open action*/);
  });

  ipcRenderer.on('open-video', (event, videoPath) => {
    store.dispatch(/*Video open action*/);
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
