import { MOVE_RESIZER_HOR, MOVE_RESIZER_VER } from '../constants/actionTypes';

export const moveResizerHor = (left) => ({
  type: MOVE_RESIZER_HOR,
  left,
});

export const moveResizerVer = (top) => ({
  type: MOVE_RESIZER_VER,
  top,
});
