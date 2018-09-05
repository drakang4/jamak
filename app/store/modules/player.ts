import { createStandardAction, ActionType } from 'typesafe-actions';

const LOAD_VIDEO = 'jamak/player/LOAD_VIDEO';
const LOADED = 'jamak/player/LOADED';
const PLAY = 'jamak/player/PLAY';
const PAUSE = 'jamak/player/PAUSE';
const STOP = 'jamak/player/STOP';
const MUTE = 'jamak/player/MUTE';
const UNMUTE = 'jamak/player/UNMUTE';
const SET_VOLUME = 'jamak/player/SET_VOLUME';
const SET_SPEED = 'jamak/player/SET_SPEED';
const TIME_UPDATE = 'jamak/player/TIME_UPDATE';
const SEEK = 'jamak/player/SEEK';
const END_SEEK = 'jamak/plyaer/END_SEEK';

export const actions = {
  loadVideo: createStandardAction(LOAD_VIDEO)<string>(),
  loaded: createStandardAction(LOADED)<number>(),
  play: createStandardAction(PLAY)<void>(),
  pause: createStandardAction(PAUSE)<void>(),
  stop: createStandardAction(STOP)<void>(),
  mute: createStandardAction(MUTE)<void>(),
  unmute: createStandardAction(UNMUTE)<void>(),
  setVolume: createStandardAction(SET_VOLUME)<number>(),
  setSpeed: createStandardAction(SET_SPEED)<number>(),
  timeUpdate: createStandardAction(TIME_UPDATE)<number>(),
  seek: createStandardAction(SEEK)<number>(),
  endSeek: createStandardAction(END_SEEK)<boolean>(),
};

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
    case LOAD_VIDEO:
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
    case LOADED:
      return {
        ...state,
        loaded: true,
        playing: false,
        seeking: false,
        currentTime: 0,
        duration: action.payload,
        playbackRate: 1,
      };
    case PLAY:
      return {
        ...state,
        playing: true,
      };
    case PAUSE:
      return {
        ...state,
        playing: false,
      };
    case STOP:
      return {
        ...state,
        currentTime: 0,
        playing: false,
      };
    case MUTE:
      return {
        ...state,
        muted: true,
      };
    case UNMUTE:
      return {
        ...state,
        muted: false,
      };
    case SET_VOLUME:
      return {
        ...state,
        muted: false,
        volume: action.payload,
      };
    case SET_SPEED:
      return {
        ...state,
        playbackRate: action.payload,
      };
    case TIME_UPDATE:
      return {
        ...state,
        currentTime: action.payload,
      };
    case SEEK:
      return {
        ...state,
        currentTime: action.payload,
        playing: false,
        seeking: true,
      };
    case END_SEEK:
      return {
        ...state,
        playing: action.payload,
        seeking: false,
      };
    default:
      return state;
  }
}
