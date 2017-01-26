import { combineReducers } from 'redux';
import blocks from './blocks';
import player from './player';
import timeline from './timeline';

const rootReducer = combineReducers({
  blocks,
  player,
  timeline,
});

export default rootReducer;
