import { createStandardAction, ActionType } from 'typesafe-actions';

// Actions
const SET_SUBTITLE_READY = 'jamak/welcome/SUBTITLE_READY';
const SET_VIDEO_READY = 'jamak/welcome/VIDEO_READY';

// Action Creators
export const actions = {
  setSubtitleReady: createStandardAction(SET_SUBTITLE_READY)<boolean>(),
  setVideoReady: createStandardAction(SET_VIDEO_READY)<boolean>(),
};

export interface WelcomeState {
  readonly subtitleReady: boolean;
  readonly videoReady: boolean;
}

export type WelcomeAction = ActionType<typeof actions>;

const initialState: WelcomeState = {
  subtitleReady: false,
  videoReady: false,
};

// Reducers
export default function reducer(
  state: WelcomeState = initialState,
  action: WelcomeAction,
): WelcomeState {
  switch (action.type) {
    case SET_SUBTITLE_READY:
      return {
        ...state,
        subtitleReady: action.payload,
      };
    case SET_VIDEO_READY:
      return {
        ...state,
        videoReady: action.payload,
      };
    default:
      return state;
  }
}
