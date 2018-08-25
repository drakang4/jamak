import { ActionType, getType } from 'typesafe-actions';
import * as actions from '../actions/welcome';

export interface WelcomeState {
  readonly subtitleReady: boolean;
  readonly videoReady: boolean;
}

export type WelcomeAction = ActionType<typeof actions>;

const initialState: WelcomeState = {
  subtitleReady: false,
  videoReady: false,
};

export default function reducer(
  state: WelcomeState = initialState,
  action: WelcomeAction,
): WelcomeState {
  switch (action.type) {
    case getType(actions.setSubtitleReady):
      return {
        ...state,
        subtitleReady: action.payload,
      };
    case getType(actions.setVideoReady):
      return {
        ...state,
        videoReady: action.payload,
      };
    default:
      return state;
  }
}
