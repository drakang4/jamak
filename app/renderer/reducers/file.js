import { basename } from 'path';
import * as types from '../constants/actionTypes/file';

const initialState = {
  videoPath: '',
  videoFilename: '',
  subtitlePath: '',
  subtitleFilename: '',
};

export default function file(state = initialState, action) {
  switch (action.type) {
    case types.NEW_BLOCK_FILE:
      return {
        ...state,
        subtitlePath: '',
        subtitleFilename: '새 파일',
      };
    case types.LOAD_BLOCK_FILE:
      return {
        ...state,
        subtitlePath: action.path,
        subtitleFilename: basename(action.path),
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
        videoFilename: basename(action.path),
      };
    default:
      return state;
  }
}
