import React, { Component, PropTypes } from 'react';

import TopPane from './TopPane';
import BottomPane from './BottomPane';
import Resizer from '../components/Resizer/Resizer';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 100,
    };
  }

  render() {
    return (
      <div>
        <TopPane />
        <Resizer type="vertical" />
        <BottomPane />
      </div>
    );
  }
}

export default Editor;
