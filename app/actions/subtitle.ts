import { createStandardAction } from 'typesafe-actions';
import { Subtitle } from '../models/subtitle';

const LOAD_DATA = 'jamak/subtitle/LOAD_DATA';
const NEW_DATA = 'jamak/subtitle/NEW_DATA';
const SAVE_DATA = 'jamak/subtitle/SAVE_DATA';
const SELECT_SUBTITLE = 'jamak/subtitle/SELECT_SUBTITLE';
const ADD_SUBTITLE = 'jamak/subtitle/ADD_SUBTITLE';
const UPDATE_SUBTITLE = 'jamak/subtitle/UPDATE_SUBTITLE';
const DELETE_SUBTITLE = 'jamak/subtitle/DELETE_SUBTITLE';
const SORT_SUBTITLE = 'jamak/subtitle/SORT_SUBTITLE';

export const loadData = createStandardAction(LOAD_DATA)<{
  filepath: string;
  data: Subtitle[];
}>();
export const newData = createStandardAction(NEW_DATA)<void>();
export const saveData = createStandardAction(SAVE_DATA)<{
  filepath: string;
  data: Subtitle[];
}>();
export const selectSubtitle = createStandardAction(SELECT_SUBTITLE)<number[]>();
export const addSubtitle = createStandardAction(ADD_SUBTITLE)<Subtitle>();
export const updateSubtitle = createStandardAction(UPDATE_SUBTITLE)<{
  index: number;
  subtitle: Subtitle;
}>();
export const deleteSubtitle = createStandardAction(DELETE_SUBTITLE)<number>();
export const sortSubtitle = createStandardAction(SORT_SUBTITLE)<Subtitle[]>();
