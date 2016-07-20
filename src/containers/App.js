import React, { Component } from 'react';
import Tutorial from '../components/Tutorial';
import TopPane from '../components/TopPane';
import BottomPane from '../components/BottomPane';
import Resizer from '../components/Resizer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Tutorial />
        <TopPane />
        <Resizer type="vertical"/>
        <BottomPane />
      </div>
    );
  }
}
