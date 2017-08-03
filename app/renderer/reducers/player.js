import * as types from '../constants/actionTypes/player';

const initialState = {
  loading: true,
  playing: false,
  muted: false,
  loop: false,
  duration: 0,
  currentTime: 0,
  seeking: false,
  playWhenFinishSeek: false,
};

export default function player(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_PLAY:
      return {
        ...state,
        playing: !state.playing,
      };
    case types.TOGGLE_MUTE:
      return {
        ...state,
        muted: !state.muted,
      };
    case types.TOGGLE_LOOP:
      return {
        ...state,
        loop: !state.loop,
      };
    case types.UPDATE_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.currentTime,
      };
    case types.UPDATE_DURATION:
      return {
        ...state,
        duration: action.duration,
      };
    case types.END_PLAY:
      return {
        ...state,
        playing: false,
      };
    case types.START_LOADING:
      return {
        ...state,
        loading: true,
        playing: false,
        currentTime: 0,
        duration: 0,
      };
    case types.END_LOADING:
      return {
        ...state,
        loading: false,
      };
    case types.START_SEEK:
      return {
        ...state,
        playWhenFinishSeek: state.playing,
        playing: false,
        seeking: true,
        currentTime: action.updatedTime,
      };
    case types.DOING_SEEK:
      return {
        ...state,
        currentTime: action.updatedTime,
      };
    case types.END_SEEK:
      return {
        ...state,
        playing: state.playWhenFinishSeek,
        playWhenFinishSeek: false,
        seeking: false,
      };
    default:
      return state;
  }
}
