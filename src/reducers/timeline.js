import {
  SET_MULTIPLE,
} from '../actions/types';
import update from 'react-addons-update';

const initialState = {
  multiple: 100
};

export default function timeline(state = initialState, action) {
  switch (action.type) {
    /**
     * 타임라인 확대 배수 설정
     */
    case SET_MULTIPLE:
      return update(state, {
        multiple: { $set: action.multiple }
      });
    default:
      return state;
  }
}
