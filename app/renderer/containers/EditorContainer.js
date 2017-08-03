import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Split from '../components/Split';
import PlayerContainer from './PlayerContainer';
import BlockTableContainer from './BlockTableContainer';
import TimelineContainer from './TimelineContainer';
import BlockControlsContainer from './BlockControlsContainer';

class EditorContainer extends Component {
  static propTypes = {
    horizPosition: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    vertPosition: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  };

  render() {
    const { horizPosition, vertPosition } = this.props;
    return (
      <Split type="horizontal" defaultSize={horizPosition}>
        <Split type="vertical" defaultSize={vertPosition}>
          <PlayerContainer />
          <BlockTableContainer />
        </Split>
        <Split type="vertical" defaultSize={48} disableResize>
          <BlockControlsContainer />
          <TimelineContainer />
        </Split>
      </Split>
    );
  }
}

const mapStateToProps = state => ({
  horizPosition: state.app.horizPosition,
  vertPosition: state.app.vertPosition,
});

export default connect(mapStateToProps)(EditorContainer);
