import {
  DOWN_RESIZER,
  MOVE_RESIZER_HOR,
  MOVE_RESIZER_VER,
  UP_RESIZER
} from '../actions/types';
import update from 'react-addons-update';

const initialState = {
  top: 0,
  left: 0
};

export default function resizer(state = initialState, action) {
  switch (action.type) {
    /**
     * 패널 리사이저 클릭
     */
    case DOWN_RESIZER:
      return update(state, {});
    /**
     * 패널 리사이저 수평 이동
     */
    case MOVE_RESIZER_HOR:
      return update(state, {
        left: {
          $set: action.left
        }
      });
    /**
     * 패널 리사이저 수직 이동
     */
    case MOVE_RESIZER_VER:
      return update(state, {
        top: {
          $set: action.top
        }
      });
    /**
     * 패널 리사이저 클릭 종료
     */
    case UP_RESIZER:
      return update(state, {});

    default:
      return state;
  }
}
