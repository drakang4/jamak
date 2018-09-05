import { Middleware } from 'redux';
import { getType } from 'typesafe-actions';
import { actions as subtitleActions } from '../modules/subtitle';
import { RootState } from '../rootReducer';

const subtitle: Middleware<{}, RootState> = store => next => action => {
  switch (action.type) {
    case getType(subtitleActions.addSubtitle):
    case getType(subtitleActions.updateSubtitle):
    case getType(subtitleActions.deleteSubtitle):
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
      store.dispatch(subtitleActions.sortSubtitle(sorted));

      // TODO: Update selectedIndex
      return;
    default:
      return next(action);
  }
};

export default subtitle;
