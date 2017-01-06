import {
  LOAD_VIDEO,
  DOWN_PROGRESS,
  MOVE_PROGRESS,
  UP_PROGRESS,
  END_SEEK,
  UPDATE_CURRENT_TIME,
  UPDATE_DURATION,
  END_PLAY,
  TOGGLE_PLAY,
  TOGGLE_MUTE,
} from '../constants/actionTypes';

export const loadVideo = (url) => ({
  type: LOAD_VIDEO,
  url,
});

export const downProgress = (rate) => ({
  type: DOWN_PROGRESS,
  rate,
});

export const moveProgress = (rate) => ({
  type: MOVE_PROGRESS,
  rate,
});

export const upProgress = () => ({
  type: UP_PROGRESS,
});

export const endSeek = () => ({
  type: END_SEEK,
});

export const updateCurrentTime = (currentTime) => ({
  type: UPDATE_CURRENT_TIME,
  currentTime,
});

export const updateDuration = (duration) => ({
  type: UPDATE_DURATION,
  duration,
});

export const endPlay = () => ({
  type: END_PLAY,
});

export const togglePlay = () => ({
  type: TOGGLE_PLAY,
});

export const toggleMute = () => ({
  type: TOGGLE_MUTE,
});
