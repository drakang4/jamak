import * as types from '../constants/actionTypes/file';

export const newFile = () => ({
  type: types.NEW_BLOCK_FILE,
});

export const loadFile = (path) => ({
  type: types.LOAD_BLOCK_FILE,
  path,
});

export const saveFile = () => ({
  type: types.SAVE_BLOCK_FILE,
});

export const unsavedFile = () => ({
  type: types.UNSAVED_BLOCK_FILE,
});

export const loadVideo = (path) => ({
  type: types.LOAD_VIDEO,
  path,
});
