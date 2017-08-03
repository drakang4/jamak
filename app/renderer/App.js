import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Redirect, Switch } from 'react-router-dom';
import configureStore from './store/configureStore';
import ipcManager from './utils/ipcManager';

import PrepareContainer from './containers/PrepareContainer';
import EditorContainer from './containers/EditorContainer';

import './styles/App.css';

const store = configureStore();
ipcManager(store);

let ready = false;

const StartRoute = () => (
  <Redirect to={ready ? '/editor' : '/prepare'} />
);

const App = () => (
  <Provider store={store}>
    <MemoryRouter>
      <Switch>
        <Route exact path="/" component={StartRoute} />
        <Route path="/editor" component={EditorContainer} />
        <Route path="/prepare" component={PrepareContainer} />
      </Switch>
    </MemoryRouter>
  </Provider>
);

export default App;
