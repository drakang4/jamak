import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';
import DevTools from '../containers/DevTools';

import rootReducer from '../reducers';

const enhancer = compose(
  applyMiddleware(thunk),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }
  return store;
}
