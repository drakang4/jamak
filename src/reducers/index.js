import { combineReducers } from 'redux';
import blocks from './blocks';
import file from './file';
import player from './player';
import timeline from './timeline';

const rootReducer = combineReducers({
  blocks,
  file,
  player,
  timeline,
});

export default rootReducer;
