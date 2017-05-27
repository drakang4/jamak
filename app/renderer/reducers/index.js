import { combineReducers } from 'redux';
import blocks from './blocks';
import file from './file';
import player from './player';

const rootReducer = combineReducers({
  blocks,
  file,
  player,
});

export default rootReducer;
