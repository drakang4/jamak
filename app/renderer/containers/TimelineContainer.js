import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startSeek, doingSeek, endSeek } from '../actions/player';

import Timeline from '../components/Timeline';

class TimelineContainer extends Component {
  static propTypes = {
    blocks: PropTypes.array.isRequired,
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    seeking: PropTypes.bool.isRequired,
    currentBlockId: PropTypes.number.isRequired,
    selectedBlockId: PropTypes.number.isRequired,
    onStartSeek: PropTypes.func.isRequired,
    onDoingSeek: PropTypes.func.isRequired,
    onEndSeek: PropTypes.func.isRequired,

  };

  render() {
    const {
      blocks,
      currentBlockId,
      selectedBlockId,
      currentTime,
      duration,
      seeking,
      onStartSeek,
      onDoingSeek,
      onEndSeek,
    } = this.props;

    return (
      <Timeline
        blocks={blocks}
        currentBlockId={currentBlockId}
        selectedBlockId={selectedBlockId}
        currentTime={currentTime}
        duration={duration}
        seeking={seeking}
        onStartSeek={onStartSeek}
        onDoingSeek={onDoingSeek}
        onEndSeek={onEndSeek}
      />
    );
  }
}

const mapStateToProps = state => ({
  blocks: state.blocks.blocks,
  currentBlockId: state.blocks.currentBlockId,
  selectedBlockId: state.blocks.selectedBlockId,
  currentTime: state.player.currentTime,
  duration: state.player.duration,
  seeking: state.player.seeking,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    onStartSeek: startSeek,
    onDoingSeek: doingSeek,
    onEndSeek: endSeek,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer);
