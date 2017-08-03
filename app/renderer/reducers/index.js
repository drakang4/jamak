import { combineReducers } from 'redux';
import app from './app';
import blocks from './blocks';
import file from './file';
import player from './player';

const rootReducer = combineReducers({
  app,
  blocks,
  file,
  player,
});

export default rootReducer;
