import { combineReducers } from 'redux';
import blocks from './blocks';
import player from './player';
import resizer from './resizer';
import timeline from './timeline';

const rootReducer = combineReducers({
  blocks,
  player,
  resizer,
  timeline,
});

export default rootReducer;
