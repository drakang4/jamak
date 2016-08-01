import * as types from './types';

export const setMultiple = (multiple) => {
  return {
    type: types.SET_MULTIPLE,
    multiple
  };
};
