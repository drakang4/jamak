import * as types from '../constants/actionTypes/file';

const initialState = {
  videoPath: '',
  subtitlePath: '',
};

export default function file(state = initialState, action) {
  switch (action.type) {
    case types.NEW_BLOCK_FILE:
      return {
        ...state,
        subtitlePath: '',
      };
    case types.LOAD_BLOCK_FILE:
      return {
        ...state,
        subtitlePath: action.path,
      };
    case types.SAVE_BLOCK_FILE:
      return {
        ...state,
      };
    case types.UNSAVED_BLOCK_FILE:
      return {
        ...state,
      };
    case types.LOAD_VIDEO:
      return {
        ...state,
        videoPath: action.path,
      };
    default:
      return state;
  }
}
