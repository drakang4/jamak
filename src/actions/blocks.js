import * as types from '../constants/actionTypes/blocks';

export const setData = (data) => ({
  type: types.SET_DATA,
  data,
});

export const currentBlock = (id) => ({
  type: types.CURRENT_BLOCK,
  id,
});

export const selectBlock = (id) => ({
  type: types.SELECT_BLOCK,
  id,
});

export const addBlock = (startTime, endTime) => ({
  type: types.ADD_BLOCK,
  startTime,
  endTime,
});

export const clearBlock = (id) => ({
  type: types.CLEAR_BLOCK,
  id,
});

export const deleteBlock = (id) => ({
  type: types.DELETE_BLOCK,
  id,
});

export const updateBlockText = (subtitle) => ({
  type: types.UPDATE_BLOCK_TEXT,
  subtitle,
});

export const updateBlockTime = (id, startTime, endTime) => ({
  type: types.UPDATE_BLOCK_TIME,
  id,
  startTime,
  endTime,
});

export const resetBlockId = () => ({
  type: types.RESET_BLOCK_ID,
});

export const sortBlocks = (blocks) => ({
  type: types.SORT_BLOCKS,
  blocks,
});

// export const addBlockFirst = (startTime, endTime) => ({
//   ADD_BLOCK_FIRST,
//   startTime,
//   endTime,
// });

// export const addBlockLast = (startTime, endTime) => ({
//   type: ADD_BLOCK_LAST,
//   startTime,
//   endTime,
// });

// export const addBlockOver = (startTime, endTime) => ({
//   type: ADD_BLOCK_OVER,
//   startTime,
//   endTime,
// });

// export const addBlockBetween = (startTime, endTime, nextBlockId) => ({
//   type: ADD_BLOCK_BETWEEN,
//   startTime,
//   endTime,
//   nextBlockId,
// });

// export const newBlockFile = () => ({
//   type: NEW_BLOCK_FILE,
// });

// export const loadBlockFile = (blocks) => ({
//   type: LOAD_BLOCK_FILE,
//   blocks,
// });

// export const savedBlockFile = (path) => ({
//   type: SAVED_BLOCK_FILE,
//   path,
// });

// export const unsavedBlockFile = () => ({
//   type: UNSAVED_BLOCK_FILE,
// });
