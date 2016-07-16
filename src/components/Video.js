import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import Actions from '../actions';
import BlockEditor from './BlockEditor.js';


class Video extends Component {
  handleLoadedData(e) {
    this.props.onUpdateDuration(e.target.duration);
  }

  handleTimeUpdate(e) {
    let currentBlock = this.props.blocks.find((block) => block.startTime <= e.target.currentTime && block.endTime >= e.target.currentTime);

    if(currentBlock) {
      this.props.currentBlock(currentBlock.id);
    } else {
      this.props.currentBlock(null);
    }
    this.props.onUpdateCurrentTime(e.target.currentTime);
  }

  handleEnded(e) {
    this.props.onEndPlay();
  }

  componentDidMount() {
    ipcRenderer.on('video-open', (event, filename) => {
      this.props.loadVideo(filename);
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.playing && !nextProps.playing) {
      findDOMNode(this.refs.video).pause();
    } else if (!this.props.playing && nextProps.playing) {
      findDOMNode(this.refs.video).play();
    } else if(this.props.muted && !nextProps.muted) {
      findDOMNode(this.refs.video).muted = nextProps.muted;
    } else if(!this.props.muted && nextProps.muted) {
      findDOMNode(this.refs.video).muted = nextProps.muted;
    } else if(this.props.seeking && !nextProps.seeking) {
      findDOMNode(this.refs.video).currentTime = nextProps.seekTime;
      this.props.onEndSeek();
    }
  }


  render() {
    return (
      <div className="video">
        <video
          className="video__view"
          ref="video"
          src={this.props.url}
          onLoadedData={this.handleLoadedData.bind(this)}
          onTimeUpdate={this.handleTimeUpdate.bind(this)}
          onEnded={this.handleEnded.bind(this)}></video>
        <BlockEditor />
      </div>
    );
  }
}

Video.propTypes = {
  loadVideo: PropTypes.func.isRequired,
  onUpdateDuration: PropTypes.func.isRequired,
  onUpdateCurrentTime: PropTypes.func.isRequired,
  onEndPlay: PropTypes.func.isRequired,
  onEndSeek: PropTypes.func.isRequired,
  currentBlock: PropTypes.func.isRequired,
  blocks: PropTypes.array.isRequired,
  playing: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  progressRate: PropTypes.number,
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  seekTime: PropTypes.number,
  seeking: PropTypes.bool.isRequired,
  url: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    blocks: state.blocks.blocks,
    playing: state.player.playing,
    muted: state.player.muted,
    progressRate: state.player.progressRate,
    currentTime: state.player.currentTime,
    duration: state.player.duration,
    seekTime: state.player.seekTime,
    seeking: state.player.seeking,
    url: state.player.url
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadVideo: (url) => dispatch(Actions.loadVideo(url)),
    onUpdateDuration: (duration) => dispatch(Actions.updateDuration(duration)),
    onUpdateCurrentTime: (currentTime) => dispatch(Actions.updateCurrentTime(currentTime)),
    onEndPlay: () => dispatch(Actions.endPlay()),
    onEndSeek: () => dispatch(Actions.endSeek()),
    currentBlock: (id) => dispatch(Actions.currentBlock(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
