import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { togglePlay, toggleMute } from '../actions/player';
import Player from '../components/Player';

class PlayerContainer extends Component {
  static propTypes = {
    currentTime: PropTypes.number.isRequired,
    muted: PropTypes.bool.isRequired,
    playing: PropTypes.bool.isRequired,
    seeking: PropTypes.bool.isRequired,
    videoPath: PropTypes.string.isRequired,
    onTogglePlay: PropTypes.func.isRequired,
    onToggleMute: PropTypes.func.isRequired,
    onLoadedData: PropTypes.func.isRequired,
    onTimeUpdate: PropTypes.func.isRequired,
    onEnded: PropTypes.func.isRequired,
  };

  render() {
    const {
      currentTime, muted, playing, seeking, videoPath,
      onTogglePlay, onToggleMute, onLoadedData, onTimeUpdate, onEnded,
    } = this.props;

    return (
      <Player
        currentTime={currentTime}
        muted={muted}
        playing={playing}
        seeking={seeking}
        videoPath={videoPath}
        onTogglePlay={onTogglePlay}
        onToggleMute={onToggleMute}
        onLoadedData={onLoadedData}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentTime: state.player.currentTime,
  muted: state.player.muted,
  playing: state.player.playing,
  seeking: state.player.seeking,
  videoPath: state.file.videoPath,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    onTogglePlay: togglePlay,
    onToggleMute: toggleMute,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
