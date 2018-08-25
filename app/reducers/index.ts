import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import player from './player';
import subtitle from './subtitle';
import timeline from './timeline';
import welcome from './welcome';

const rootReducer = combineReducers({
  player,
  subtitle,
  timeline,
  welcome,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
