import * as types from './types';

export const resetBlockId = () => {
  return {
    type: types.RESET_BLOCK_ID
  };
};
export const sortBlocks = (blocks) => {
  return {
    type: types.SORT_BLOCKS,
    blocks
  };
};

export const addBlockFirst = (startTime, endTime) => {
  return {
    type: types.ADD_BLOCK_FIRST,
    startTime,
    endTime
  };
};

export const addBlockLast = (startTime, endTime) => {
  return {
    type: types.ADD_BLOCK_LAST,
    startTime,
    endTime
  };
};

export const addBlockOver = (startTime, endTime) => {
  return {
    type: types.ADD_BLOCK_OVER,
    startTime,
    endTime
  };
};

export const addBlockBetween = (startTime, endTime, nextBlockId) => {
  return {
    type: types.ADD_BLOCK_BETWEEN,
    startTime,
    endTime,
    nextBlockId
  };
};

export const deleteBlock = (id) => {
  return {
    type: types.DELETE_BLOCK,
    id
  };
};

export const clearBlock = (id) => {
  return {
    type: types.CLEAR_BLOCK,
    id
  };
};

export const selectBlock = (id) => {
  return {
    type: types.SELECT_BLOCK,
    id
  };
};

export const currentBlock = (id) => {
  return {
    type: types.CURRENT_BLOCK,
    id
  };
};

export const updateBlockText = (subtitle) => {
  return {
    type: types.UPDATE_BLOCK_TEXT,
    subtitle
  };
};

export const updateBlockTime = (id, startTime, endTime) => {
  return {
    type: types.UPDATE_BLOCK_TIME,
    id,
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
