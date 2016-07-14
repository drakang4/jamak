import * as types from './types';

export const loadVideo = (url) => {
  return {
    type: types.LOAD_VIDEO,
    url
  };
};

export const downProgress = (rate) => {
  return {
    type: types.DOWN_PROGRESS,
    rate
  };
};

export const moveProgress = (rate) => {
  return {
    type: types.MOVE_PROGRESS,
    rate
  };
};

export const upProgress = () => {
  return {
    type: types.UP_PROGRESS
  };
};

export const endSeek = () => {
  return {
    type: types.END_SEEK
  };
};

export const updateCurrentTime = (currentTime) => {
  return {
    type: types.UPDATE_CURRENT_TIME,
    currentTime
  };
};

export const updateDuration = (duration) => {
  return {
    type: types.UPDATE_DURATION,
    duration
  };
};

export const endPlay = () => {
  return {
    type: types.END_PLAY
  };
};

export const togglePlay = () => {
  return {
    type: types.TOGGLE_PLAY
  };
};

export const toggleMute = () => {
  return {
    type: types.TOGGLE_MUTE
  };
};
