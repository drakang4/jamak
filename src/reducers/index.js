import { combineReducers } from 'redux';
import blocks from './blocks';
import player from './player';
import resizer from './resizer';

const rootReducer = combineReducers({
  blocks,
  player,
  resizer
});

export default rootReducer;
