import { createStore, applyMiddleware, Middleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

import fileHandlerMiddleware from './middlewares/fileHandler';
import loggerMiddleware from './middlewares/logger';
import subtitleMiddleware from './middlewares/subtitle';

export default function configureStore(preloadedState: object) {
  const middlewares: Middleware[] = [
    fileHandlerMiddleware,
    loggerMiddleware,
    subtitleMiddleware,
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
  }

  return store;
}
