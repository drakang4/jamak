import { Middleware } from 'redux';
import { getType } from 'typesafe-actions';
import { actions as subtitleActions } from '../modules/subtitle';
import { actions as playerActions } from '../modules/player';
import { actions as welcomeActions } from '../modules/welcome';
import { ipcRenderer } from 'electron';
import { RootState } from '../rootReducer';

const fileHandler: Middleware<{}, RootState> = store => next => action => {
  switch (action.type) {
    case getType(subtitleActions.newData):
    case getType(subtitleActions.loadData):
      store.dispatch(welcomeActions.setSubtitleReady(true));
      return next(action);
    case getType(playerActions.loadVideo):
      store.dispatch(welcomeActions.setVideoReady(true));
      return next(action);
    case getType(subtitleActions.saveData):
      const { filepath, data } = action.payload;
      ipcRenderer.send('request-save-subtitle', filepath, data);
      return next(action);
    default:
      return next(action);
  }
};

export default fileHandler;
