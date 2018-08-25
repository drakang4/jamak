import { ActionType, getType } from 'typesafe-actions';
import * as actions from '../actions/subtitle';
import { Subtitle } from '../models/subtitle';

export interface SubtitleState {
  readonly data: Subtitle[];
  readonly selectedIndex: number[];
  readonly filepath: string;
  readonly needSave: boolean;
}

export type TimelineAction = ActionType<typeof actions>;

const initialState: SubtitleState = {
  data: [],
  selectedIndex: [],
  filepath: '',
  needSave: false,
};

export default function reducer(
  state: SubtitleState = initialState,
  action: TimelineAction,
): SubtitleState {
  switch (action.type) {
    case getType(actions.loadData):
      return {
        ...state,
        data: action.payload.data,
        filepath: action.payload.filepath,
        needSave: false,
      };
    case getType(actions.newData):
      return {
        ...state,
        data: [],
        selectedIndex: [],
        filepath: '',
        needSave: true,
      };
    case getType(actions.saveData):
      return {
        ...state,
        needSave: false,
      };
    case getType(actions.selectSubtitle):
      return {
        ...state,
        selectedIndex: action.payload,
      };
    case getType(actions.addSubtitle):
      return {
        ...state,
        data: [...state.data.slice(0), action.payload],
        needSave: true,
      };
    case getType(actions.updateSubtitle):
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
    case getType(actions.deleteSubtitle):
      return {
        ...state,
        data: state.data.filter((item, index) => index !== action.payload),
        needSave: true,
      };
    case getType(actions.sortSubtitle):
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
