import { createStandardAction } from 'typesafe-actions';

const SET_MULTIPLE = 'jamak/timeline/SET_MULTIPLE';

export const setMultiple = createStandardAction(SET_MULTIPLE)<number>();
