import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Split from '../components/Split/Split';
import Player from '../components/Player/Player';
import BlockTable from '../components/BlockTable/Table';
import * as playerActions from '../actions/player';

class TopPane extends Component {
  render() {
    return (
      <Split type="vertical">
        <Player
          videoPath={this.props.videoPath}
          playing={this.props.playing}
          muted={this.props.muted}
          onTogglePlay={this.props.togglePlay}
          onToggleMute={this.props.toggleMute}
          onUpdateCurrentTime={this.props.updateCurrentTime}
          onUpdateDuration={this.props.updateDuration}
          onEndPlay={this.props.endPlay} />
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
  togglePlay: PropTypes.func.isRequired,
  toggleMute: PropTypes.func.isRequired,
  updateCurrentTime: PropTypes.func.isRequired,
  updateDuration: PropTypes.func.isRequired,
  endPlay: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  videoPath: state.file.videoPath,
  playing: state.player.playing,
  muted: state.player.muted,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(playerActions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TopPane);
