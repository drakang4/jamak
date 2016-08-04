import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import DevTools from './containers/DevTools';
import configureStore from './store/configureStore';

require ('./styles/index.scss');

const store = configureStore();

if(process.env.NODE_ENV === 'development') {
  render(
    <Provider store={store}>
      <div>
        <App />
        <DevTools />
      </div>
    </Provider>,
   document.getElementById('root')
  );
} else if(process.env.NODE_ENV === 'production') {
  render(
    <Provider store={store}>
      <div>
        <App />
      </div>
    </Provider>,
   document.getElementById('root')
  );
}
