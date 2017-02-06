import * as types from '../constants/actionTypes/player';

export const togglePlay = () => ({
  type: types.TOGGLE_PLAY,
});

export const toggleMute = () => ({
  type: types.TOGGLE_MUTE,
});

export const updateCurrentTime = (currentTime) => ({
  type: types.UPDATE_CURRENT_TIME,
  currentTime,
});

export const updateDuration = (duration) => ({
  type: types.UPDATE_DURATION,
  duration,
});

export const endPlay = () => ({
  type: types.END_PLAY,
});

export const startSeek = () => ({
  type: types.START_SEEK,
});

export const doingSeek = () => ({
  type: types.DOING_SEEK,
});

export const endSeek = () => ({
  type: types.END_SEEK,
});

// export const downProgress = (rate) => ({
//   type: types.DOWN_PROGRESS,
//   rate,
// });

// export const moveProgress = (rate) => ({
//   type: MOVE_PROGRESS,
//   rate,
// });

// export const upProgress = () => ({
//   type: UP_PROGRESS,
// });

