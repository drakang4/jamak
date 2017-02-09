import update from 'immutability-helper';
import * as types from '../constants/actionTypes/player';

const initialState = {
  playing: false,
  muted: false,
  duration: 0,
  currentTime: 0,
  seeking: false,
  playWhenFinishSeek: false,
};

export default function player(state = initialState, action) {
  switch (action.type) {
    /**
     * 비디오 재생 토클
     */
    case types.TOGGLE_PLAY:
      return {
        ...state,
        playing: !state.playing,
      };
    /**
     * 비디오 음소거 토글
     */
    case types.TOGGLE_MUTE:
      return {
        ...state,
        muted: !state.muted,
      };
    /**
     * 비디오 현재 재생 시간 설정
     */
    case types.UPDATE_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.currentTime,
      };
    /**
     * 비디오 전체 재생 시간 설정
     */
    case types.UPDATE_DURATION:
      return {
        ...state,
        duration: action.duration,
      };
    /**
     * 비디오 재생 종료
     */
    case types.END_PLAY:
      return {
        ...state,
        playing: false,
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
