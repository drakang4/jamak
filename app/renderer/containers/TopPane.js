import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Split from '../components/Split';
import Player from '../components/Player/Player';
import BlockTable from '../components/BlockTable';

import * as playerActions from '../actions/player';
import { currentBlock, updateBlockText } from '../actions/blocks';

class TopPane extends Component {
  render() {
    return (
      <Split type="vertical">
        <Player
          videoPath={this.props.videoPath}
          playing={this.props.playing}
          muted={this.props.muted}
          currentTime={this.props.currentTime}
          seeking={this.props.seeking}
          blocks={this.props.blocks}
          currentBlockId={this.props.currentBlockId}
          onTogglePlay={this.props.togglePlay}
          onToggleMute={this.props.toggleMute}
          onUpdateCurrentTime={this.props.updateCurrentTime}
          onUpdateDuration={this.props.updateDuration}
          onEndPlay={this.props.endPlay}
          updateCurrentBlock={this.props.currentBlock}
          updateBlockText={this.props.updateBlockText} />
        <BlockTable blocks={this.props.blocks} />
      </Split>
    );
  }
}

TopPane.propTypes = {
  blocks: PropTypes.array.isRequired,
  videoPath: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  seeking: PropTypes.bool.isRequired,
  currentBlockId: PropTypes.number.isRequired,
  togglePlay: PropTypes.func.isRequired,
  toggleMute: PropTypes.func.isRequired,
  updateCurrentTime: PropTypes.func.isRequired,
  updateDuration: PropTypes.func.isRequired,
  endPlay: PropTypes.func.isRequired,
  currentBlock: PropTypes.func.isRequired,
  updateBlockText: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  videoPath: state.file.videoPath,
  playing: state.player.playing,
  muted: state.player.muted,
  currentTime: state.player.currentTime,
  seeking: state.player.seeking,
  currentBlockId: state.blocks.currentBlockId,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(Object.assign({}, playerActions, { currentBlock, updateBlockText }), dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TopPane);
