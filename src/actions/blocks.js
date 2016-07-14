import * as types from './types';

export const addBlock = (startTime, endTime) => {
  return {
    type: types.ADD_BLOCK,
    startTime,
    endTime
  };
};

export const deleteBlock = (block) => {
  return {
    type: types.DELETE_BLOCK,
    block
  };
};

export const clearBlock = (block) => {
  return {
    type: types.CLEAR_BLOCK,
    block
  };
};

export const selectBlock = (id) => {
  return {
    type: types.SELECT_BLOCK,
    id
  };
};

export const cancelBlock = () => {
  return {
    type: types.CANCEL_BLOCK
  };
};

export const updateBlockText = (subtitle) => {
  return {
    type: types.UPDATE_BLOCK_TEXT,
    subtitle
  };
};

export const updateBlockTime = (startTime, endTime) => {
  return {
    type: types.UPDATE_BLOCK_TIME,
    startTime,
    endTime
  };
};

export const newBlockFile = () => {
  return {
    type: types.NEW_BLOCK_FILE
  };
};

export const loadBlockFile = (blocks) => {
  return {
    type: types.LOAD_BLOCK_FILE,
    blocks
  };
};

export const savedBlockFile = (path) => {
  return {
    type: types.SAVED_BLOCK_FILE,
    path
  };
};

export const unsavedBlockFIle = () => {
  return {
    type: types.UNSAVED_BLOCK_FILE
  };
};
