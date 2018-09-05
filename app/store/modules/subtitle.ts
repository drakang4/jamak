import { createStandardAction, ActionType } from 'typesafe-actions';
import { Subtitle } from '../../models/subtitle';

const LOAD_DATA = 'jamak/subtitle/LOAD_DATA';
const NEW_DATA = 'jamak/subtitle/NEW_DATA';
const SAVE_DATA = 'jamak/subtitle/SAVE_DATA';
const SELECT_SUBTITLE = 'jamak/subtitle/SELECT_SUBTITLE';
const ADD_SUBTITLE = 'jamak/subtitle/ADD_SUBTITLE';
const UPDATE_SUBTITLE = 'jamak/subtitle/UPDATE_SUBTITLE';
const DELETE_SUBTITLE = 'jamak/subtitle/DELETE_SUBTITLE';
const SORT_SUBTITLE = 'jamak/subtitle/SORT_SUBTITLE';

export const actions = {
  loadData: createStandardAction(LOAD_DATA)<{
    filepath: string;
    data: Subtitle[];
  }>(),
  newData: createStandardAction(NEW_DATA)<void>(),
  saveData: createStandardAction(SAVE_DATA)<{
    filepath: string;
    data: Subtitle[];
  }>(),
  selectSubtitle: createStandardAction(SELECT_SUBTITLE)<Set<number>>(),
  addSubtitle: createStandardAction(ADD_SUBTITLE)<Subtitle>(),
  updateSubtitle: createStandardAction(UPDATE_SUBTITLE)<{
    index: number;
    subtitle: Subtitle;
  }>(),
  deleteSubtitle: createStandardAction(DELETE_SUBTITLE)<number>(),
  sortSubtitle: createStandardAction(SORT_SUBTITLE)<Subtitle[]>(),
};

export interface SubtitleState {
  readonly data: Subtitle[];
  readonly selectedIndex: Set<number>;
  readonly filepath: string;
  readonly needSave: boolean;
}

export type TimelineAction = ActionType<typeof actions>;

const initialState: SubtitleState = {
  data: [],
  selectedIndex: new Set(),
  filepath: '',
  needSave: false,
};

export default function reducer(
  state: SubtitleState = initialState,
  action: TimelineAction,
): SubtitleState {
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...state,
        data: action.payload.data,
        filepath: action.payload.filepath,
        needSave: false,
      };
    case NEW_DATA:
      return {
        ...state,
        data: [],
        selectedIndex: new Set(),
        filepath: '',
        needSave: true,
      };
    case SAVE_DATA:
      return {
        ...state,
        needSave: false,
      };
    case SELECT_SUBTITLE:
      return {
        ...state,
        selectedIndex: action.payload,
      };
    case ADD_SUBTITLE:
      return {
        ...state,
        data: [...state.data.slice(0), action.payload],
        needSave: true,
      };
    case UPDATE_SUBTITLE:
      return {
        ...state,
        data: state.data.map((item, index) => {
          if (index !== action.payload.index) {
            return item;
          }

          return {
            ...item,
            ...action.payload.subtitle,
          };
        }),
        needSave: true,
      };
    case DELETE_SUBTITLE:
      return {
        ...state,
        data: state.data.filter((item, index) => index !== action.payload),
        needSave: true,
      };
    case SORT_SUBTITLE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
