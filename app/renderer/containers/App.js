import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Match, Miss, Redirect } from 'react-router';
import configureStore from '../store/configureStore';
import ipcManager from '../utils/ipcManager';

import Prepare from './Prepare';
import Editor from './Editor';
import NoMatch from './NoMatch';

import '../styles/App.css';

const store = configureStore();
ipcManager(store);
const ready = false;

const App = () => (
  <Provider store={store}>
    <MemoryRouter>
      <div>
        <Match
          exactly
          pattern="/"
          render={() => (
            ready ? (
              <Redirect to="/editor" />
            ) : (
              <Redirect to="/prepare" />
            ))} />
        <Match pattern="/editor" component={Editor} />
        <Match pattern="/prepare" component={Prepare} />
        <Miss component={NoMatch} />
      </div>
    </MemoryRouter>
  </Provider>
);

export default App;
