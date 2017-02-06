import * as types from '../constants/actionTypes/file';

const initialState = {
  videoPath: '',
  subtitlePath: '',
  subtitleSaved: false,
};

export default function file(state = initialState, action) {
  switch (action.type) {
    case types.NEW_BLOCK_FILE:
      return {
        ...state,
        subtitlePath: '',
        subtitleSaved: false,
      };
    case types.LOAD_BLOCK_FILE:
      return {
        ...state,
        subtitlePath: action.path,
        subtitleSaved: true,
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
