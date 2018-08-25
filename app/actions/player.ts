import { createStandardAction } from 'typesafe-actions';

const LOAD_VIDEO = 'jamak/player/LOAD_VIDEO';
const LOADED = 'jamak/player/LOADED';
const PLAY = 'jamak/player/PLAY';
const PAUSE = 'jamak/player/PAUSE';
const STOP = 'jamak/player/STOP';
const MUTE = 'jamak/player/MUTE';
const UNMUTE = 'jamak/player/UNMUTE';
const SET_VOLUME = 'jamak/player/SET_VOLUME';
const SET_SPEED = 'jamak/player/SET_SPEED';
const TIME_UPDATE = 'jamak/player/TIME_UPDATE';
const SEEK = 'jamak/player/SEEK';
const END_SEEK = 'jamak/plyaer/END_SEEK';

export const loadVideo = createStandardAction(LOAD_VIDEO)<string>();
export const loaded = createStandardAction(LOADED)<number>();
export const play = createStandardAction(PLAY)<void>();
export const pause = createStandardAction(PAUSE)<void>();
export const stop = createStandardAction(STOP)<void>();
export const mute = createStandardAction(MUTE)<void>();
export const unmute = createStandardAction(UNMUTE)<void>();
export const setVolume = createStandardAction(SET_VOLUME)<number>();
export const setSpeed = createStandardAction(SET_SPEED)<number>();
export const timeUpdate = createStandardAction(TIME_UPDATE)<number>();
export const seek = createStandardAction(SEEK)<number>();
export const endSeek = createStandardAction(END_SEEK)<boolean>();
