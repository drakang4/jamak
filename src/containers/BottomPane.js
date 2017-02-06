import React, { Component, PropTypes } from 'react';
import BlockControls from '../components/BlockControls/BlockControls';
import Timeline from '../components/Timeline/Timeline';
import Split from '../components/Split/Split';

class BottomPane extends Component {
  render() {
    return (
      <Split type="vertical">
        <BlockControls />
        <Timeline />
      </Split>
    );
  }
}

BottomPane.propTypes = {
  blocks: PropTypes.array.isRequired,
};

export default BottomPane;
