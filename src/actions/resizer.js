import * as types from './types';

export const downResizer = () => {
  return {
    type: types.DOWN_RESIZER
  };
};

export const moveResizerHor = (left) => {
  return {
    type: types.MOVE_RESIZER_HOR,
    left
  };
};

export const moveResizerVer = (top) => {
  return {
    type: types.MOVE_RESIZER_VER,
    top
  };
};

export const upResizer = () => {
  return {
    type: types.UP_RESIZER
  };
};
