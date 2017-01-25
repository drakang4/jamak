import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

import Tutorial from '../components/Tutorial';
import TopPane from '../components/TopPane';
import BottomPane from '../components/BottomPane';
import Resizer from '../components/Resizer';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <div>
      <Tutorial />
      <TopPane />
      <Resizer type="vertical" />
      <BottomPane />
    </div>
  </Provider>
);

export default App;
