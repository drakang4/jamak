import { Middleware } from 'redux';

const logger: Middleware = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

export default logger;
