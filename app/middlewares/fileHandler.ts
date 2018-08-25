import { Middleware } from 'redux';
import { getType } from 'typesafe-actions';
import { loadData, newData, saveData } from '../actions/subtitle';
import { loadVideo } from '../actions/player';
import { setSubtitleReady, setVideoReady } from '../actions/welcome';
import { ipcRenderer } from 'electron';
import { RootState } from '../reducers';

const fileHandler: Middleware<{}, RootState> = store => next => action => {
  switch (action.type) {
    case getType(newData):
    case getType(loadData):
      store.dispatch(setSubtitleReady(true));
      return next(action);
    case getType(loadVideo):
      store.dispatch(setVideoReady(true));
      return next(action);
    case getType(saveData):
      const { filepath, data } = action.payload;
      ipcRenderer.send('request-save-subtitle', filepath, data);
      return next(action);
    default:
      return next(action);
  }
};

export default fileHandler;
