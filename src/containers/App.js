import React, { Component } from 'react';
import TopPane from '../components/TopPane';
import Resizer from '../components/Resizer';
import BottomPane from '../components/BottomPane';

export default class App extends Component {
  render() {
    return (
      <div>
        <TopPane />
        <Resizer type="vertical"/>
        <BottomPane />
      </div>
    );
  }
}
