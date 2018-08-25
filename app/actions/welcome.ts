import { createStandardAction } from 'typesafe-actions';

const SET_SUBTITLE_READY = 'jamak/welcome/SUBTITLE_READY';
const SET_VIDEO_READY = 'jamak/welcome/VIDEO_READY';

export const setSubtitleReady = createStandardAction(SET_SUBTITLE_READY)<
  boolean
>();
export const setVideoReady = createStandardAction(SET_VIDEO_READY)<boolean>();
