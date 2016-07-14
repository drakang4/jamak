import {
  LOAD_VIDEO,
  DOWN_PROGRESS,
  MOVE_PROGRESS,
  UP_PROGRESS,
  END_SEEK,
  UPDATE_DURATION,
  UPDATE_CURRENT_TIME,
  END_PLAY,
  TOGGLE_PLAY,
  TOGGLE_MUTE
} from '../actions/types';
import update from 'react-addons-update';

const initialState = {
  url: '',
  playing: false,
  muted: false,
  duration: null,
  currentTime: null,
  progressRate: null,
  seekTime: null,
  seeking: false
};

export default function player(state = initialState, action) {
  switch (action.type) {
    // 비디오 불러오기
    case LOAD_VIDEO:
      return update(state, {
        url: {
          $set: action.url
        }
      });
    // 프로그레스바에서 마우스 버튼을 클릭
    case DOWN_PROGRESS:
      return update(state, {
        progressRate: {
          $set: Math.round(action.rate * 1e4) / 1e4
        },
        seekTime: {
          $set: Math.round(action.rate * state.duration * 1e6) / 1e6
        },
        seeking: {
          $set: true
        }
      });
    // 프로그레스바에서 마우스 이동
    case MOVE_PROGRESS:
      return update(state, {
        progressRate: {
          $set: Math.round(action.rate * 1e4) / 1e4
        },
        seekTime: {
          $set: Math.round(action.rate * state.duration * 1e6) / 1e6
        }
      });
    // 프로그레스바에서 마우스 버튼을 뗌
    case UP_PROGRESS:
      return update(state, {
        seeking: {
          $set: false
        }
      });
    /**
     * 탐색 종료
     * UP_PROGRESS 이후에 동작
     */
    case END_SEEK:
      return update(state, {
        seekTime: {
          $set: null
        }
      });
    /**
     * 비디오 전체 재생 시간 설정
     */
    case UPDATE_DURATION:
      return update(state, {
        duration: {
          $set: action.duration
        }
      });
    /**
     * 비디오 현재 재생 시간 설정
     */
    case UPDATE_CURRENT_TIME:
      return update(state, {
        currentTime: {
          $set: action.currentTime
        },
        progressRate: {
          $set: Math.round(action.currentTime / state.duration * 1e4) / 1e4
        }
      });
    /**
     * 비디오 재생 종료
     */
    case END_PLAY:
      return update(state, {
        playing: {
          $set: false
        }
      });
    /**
     * 비디오 재생 토클
     */
    case TOGGLE_PLAY:
      return update(state, {
        playing: {
          $set: !state.playing
        }
      });
    /**
     * 비디오 음소거 토글
     */
    case TOGGLE_MUTE:
      return update(state, {
        muted: {
          $set: !state.muted
        }
      });
    default:
      return state;
  }
}
