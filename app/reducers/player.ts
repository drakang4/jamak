import { ActionType, getType } from 'typesafe-actions';
import * as actions from '../actions/player';

export interface PlayerState {
  readonly loaded: boolean;
  readonly source: string;
  readonly playing: boolean;
  readonly muted: boolean;
  readonly seeking: boolean;
  readonly duration: number;
  readonly currentTime: number;
  readonly volume: number;
  readonly playbackRate: number;
}

export type PlayerAction = ActionType<typeof actions>;

const initialState: PlayerState = {
  loaded: false,
  source: '',
  playing: false,
  muted: false,
  seeking: false,
  duration: 0,
  currentTime: 0,
  volume: 1,
  playbackRate: 1,
};

export default function reducer(
  state: PlayerState = initialState,
  action: PlayerAction,
): PlayerState {
  switch (action.type) {
    case getType(actions.loadVideo):
      return {
        ...state,
        loaded: false,
        playing: false,
        seeking: false,
        currentTime: 0,
        duration: 0,
        playbackRate: 1,
        source: action.payload,
      };
    case getType(actions.loaded):
      return {
        ...state,
        loaded: true,
        playing: false,
        seeking: false,
        currentTime: 0,
        duration: action.payload,
        playbackRate: 1,
      };
    case getType(actions.play):
      return {
        ...state,
        playing: true,
      };
    case getType(actions.pause):
      return {
        ...state,
        playing: false,
      };
    case getType(actions.stop):
      return {
        ...state,
        currentTime: 0,
        playing: false,
      };
    case getType(actions.mute):
      return {
        ...state,
        muted: true,
      };
    case getType(actions.unmute):
      return {
        ...state,
        muted: false,
      };
    case getType(actions.setVolume):
      return {
        ...state,
        muted: false,
        volume: action.payload,
      };
    case getType(actions.setSpeed):
      return {
        ...state,
        playbackRate: action.payload,
      };
    case getType(actions.timeUpdate):
      return {
        ...state,
        currentTime: action.payload,
      };
    case getType(actions.seek):
      return {
        ...state,
        currentTime: action.payload,
        playing: false,
        seeking: true,
      };
    case getType(actions.endSeek):
      return {
        ...state,
        playing: action.payload,
        seeking: false,
      };
    default:
      return state;
  }
}
