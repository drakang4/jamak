import { SET_MULTIPLE } from '../constants/actionTypes';

const initialState = {
  multiple: 100,
};

export default function timeline(state = initialState, action) {
  switch (action.type) {
    /**
     * 타임라인 확대 배수 설정
     */
    case SET_MULTIPLE:
      return {
        ...state,
        multiple: action.multiple,
      };
    default:
      return state;
  }
}
