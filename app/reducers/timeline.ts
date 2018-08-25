import { ActionType, getType } from 'typesafe-actions';
import * as actions from '../actions/timeline';

export interface TimelineState {
  readonly multiple: number;
}

export type TimelineAction = ActionType<typeof actions>;

const initialState: TimelineState = {
  multiple: 1,
};

export default function reducer(
  state: TimelineState = initialState,
  action: TimelineAction,
): TimelineState {
  switch (action.type) {
    case getType(actions.setMultiple):
      return {
        ...state,
        multiple: action.payload,
      };
    default:
      return state;
  }
}
