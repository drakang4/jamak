import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Redirect, Switch } from 'react-router-dom';
import configureStore from '../store/configureStore';
import ipcManager from '../utils/ipcManager';

import Prepare from './Prepare';
import Editor from './Editor';
import NoMatch from './NoMatch';

import '../styles/App.css';

const store = configureStore();
ipcManager(store);
let ready = false;

const StartRoute = () => {
  if (ready) {
    return (
      <Redirect to="/editor" />
    );
  } else {
    return (
      <Redirect to="/prepare" />
    );
  }
};
const App = () => (
  <Provider store={store}>
    <MemoryRouter>
      <Switch>
        <Route exact path="/" component={StartRoute} />
        <Route path="/editor" component={Editor} />
        <Route path="/prepare" component={Prepare} />
        <Route component={NoMatch} />
      </Switch>
    </MemoryRouter>
  </Provider>
);

export default App;
