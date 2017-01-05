import { MOVE_RESIZER_HOR, MOVE_RESIZER_VER } from '../constants/actionTypes';

const initialState = {
  top: 0,
  left: 0,
};

const resizer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * 패널 리사이저 수평 이동
     */
    case MOVE_RESIZER_HOR:
      return {
        ...state,
        left: action.left,
      };
    /**
     * 패널 리사이저 수직 이동
     */
    case MOVE_RESIZER_VER:
      return {
        ...state,
        top: action.top,
      };
    default:
      return state;
  }
};

export default resizer;
