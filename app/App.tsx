import React from 'react';
import { hot } from 'react-hot-loader';
import { MemoryRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from './styles/styled-components';
import { theme } from './styles/theme';
import configureStore from './store/configureStore';

const store = configureStore({});

import Editor from './screens/Editor';
import Welcome from './screens/Welcome';
import FileHandlerContainer from './containers/FileHandler';

import 'normalize.css';
import 'react-virtualized/styles.css';
import './styles/global.css';

const { subtitleReady, videoReady } = store.getState().welcome;

const StartRoute = () => {
  if (subtitleReady && videoReady) {
    return <Redirect to="/editor" />;
  }

  return <Redirect to="/welcome" />;
};

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <>
          <Switch>
            <Route exact path="/" component={StartRoute} />
            <Route path="/editor" component={Editor} />
            <Route path="/welcome" component={Welcome} />
          </Switch>
          <FileHandlerContainer />
        </>
      </MemoryRouter>
    </ThemeProvider>
  </Provider>
);

export default hot(module)(App);
