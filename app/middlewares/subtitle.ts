import { Middleware } from 'redux';
import { getType } from 'typesafe-actions';
import {
  addSubtitle,
  deleteSubtitle,
  updateSubtitle,
  sortSubtitle,
} from '../actions/subtitle';
import { RootState } from '../reducers';

const subtitle: Middleware<{}, RootState> = store => next => action => {
  switch (action.type) {
    case getType(addSubtitle):
    case getType(updateSubtitle):
    case getType(deleteSubtitle):
      next(action);

      const sorted = store
        .getState()
        .subtitle.data.slice(0)
        .sort((a, b) => {
          if (a.startTime > b.startTime) {
            return 1;
          } else if (a.startTime < b.startTime) {
            return -1;
          } else {
            return 0;
          }
        });
      store.dispatch(sortSubtitle(sorted));

      // TODO: Update selectedIndex
      return;
    default:
      return next(action);
  }
};

export default subtitle;
