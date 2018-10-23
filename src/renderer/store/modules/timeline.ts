import { createStandardAction, ActionType } from 'typesafe-actions';

const SET_MULTIPLE = 'jamak/timeline/SET_MULTIPLE';

export const actions = {
  setMultiple: createStandardAction(SET_MULTIPLE)<number>(),
};

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
    case SET_MULTIPLE:
      return {
        ...state,
        multiple: action.payload,
      };
    default:
      return state;
  }
}
