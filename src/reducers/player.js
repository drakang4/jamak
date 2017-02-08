import update from 'immutability-helper';
import * as types from '../constants/actionTypes/player';

const initialState = {
  playing: false,
  muted: false,
  duration: 0,
  currentTime: 0,
  seeking: false,
  playWhenFinishSeek: false,
  // progressRate: null,
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

      // return update(state, {
      //   currentTime: {
      //     $set: action.currentTime
      //   },
      //   progressRate: {
      //     $set: Math.round(action.currentTime / state.duration * 1e4) / 1e4
      //   }
      // });
    /**
     * 비디오 전체 재생 시간 설정
     */
    case types.UPDATE_DURATION:
      return {
        ...state,
        duration: action.duration,
      };
      // return update(state, {
      //   duration: {
      //     $set: action.duration
      //   }
      // });
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
        // seekTime: 
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
    // // 프로그레스바에서 마우스 버튼을 클릭
    // case types.DOWN_PROGRESS:
    //   return update(state, {
    //     progressRate: {
    //       $set: Math.round(action.rate * 1e4) / 1e4
    //     },
    //     seekTime: {
    //       $set: Math.round(action.rate * state.duration * 1e6) / 1e6
    //     },
    //     seeking: {
    //       $set: true
    //     }
    //   });
    // // 프로그레스바에서 마우스 이동
    // case types.MOVE_PROGRESS:
    //   return update(state, {
    //     progressRate: {
    //       $set: Math.round(action.rate * 1e4) / 1e4
    //     },
    //     seekTime: {
    //       $set: Math.round(action.rate * state.duration * 1e6) / 1e6
    //     }
    //   });
    // // 프로그레스바에서 마우스 버튼을 뗌
    // case types.UP_PROGRESS:
    //   return update(state, {
    //     seeking: {
    //       $set: false
    //     }
    //   });
    // /**
    //  * 탐색 종료
    //  * UP_PROGRESS 이후에 동작
    //  */
    // case types.END_SEEK:
    //   return update(state, {
    //     seekTime: {
    //       $set: null
    //     }
    //   });
    default:
      return state;
  }
}
