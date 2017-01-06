import {
  RESET_BLOCK_ID,
  SORT_BLOCKS,
  ADD_BLOCK_FIRST,
  ADD_BLOCK_LAST,
  ADD_BLOCK_OVER,
  ADD_BLOCK_BETWEEN,
  DELETE_BLOCK,
  CLEAR_BLOCK,
  SELECT_BLOCK,
  CURRENT_BLOCK,
  UPDATE_BLOCK_TEXT,
  UPDATE_BLOCK_TIME,
  NEW_BLOCK_FILE,
  LOAD_BLOCK_FILE,
  SAVED_BLOCK_FILE,
  UNSAVED_BLOCK_FILE,
} from '../constants/actionTypes';

export const resetBlockId = () => ({
  RESET_BLOCK_ID,
});

export const sortBlocks = (blocks) => ({
  SORT_BLOCKS,
  blocks,
});

export const addBlockFirst = (startTime, endTime) => ({
  ADD_BLOCK_FIRST,
  startTime,
  endTime,
});

export const addBlockLast = (startTime, endTime) => ({
  type: ADD_BLOCK_LAST,
  startTime,
  endTime,
});

export const addBlockOver = (startTime, endTime) => ({
  type: ADD_BLOCK_OVER,
  startTime,
  endTime,
});

export const addBlockBetween = (startTime, endTime, nextBlockId) => ({
  type: ADD_BLOCK_BETWEEN,
  startTime,
  endTime,
  nextBlockId,
});

export const deleteBlock = (id) => ({
  type: DELETE_BLOCK,
  id,
});

export const clearBlock = (id) => ({
  type: CLEAR_BLOCK,
  id,
});

export const selectBlock = (id) => ({
  type: SELECT_BLOCK,
  id,
});

export const currentBlock = (id) => ({
  type: CURRENT_BLOCK,
  id,
});

export const updateBlockText = (subtitle) => ({
  type: UPDATE_BLOCK_TEXT,
  subtitle,
});

export const updateBlockTime = (id, startTime, endTime) => ({
  type: UPDATE_BLOCK_TIME,
  id,
  startTime,
  endTime,
});

export const newBlockFile = () => ({
  type: NEW_BLOCK_FILE,
});

export const loadBlockFile = (blocks) => ({
  type: LOAD_BLOCK_FILE,
  blocks,
});

export const savedBlockFile = (path) => ({
  type: SAVED_BLOCK_FILE,
  path,
});

export const unsavedBlockFile = () => ({
  type: UNSAVED_BLOCK_FILE,
});
