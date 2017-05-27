import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import SubtitleBox from './SubtitleBox';
import styles from './styles.css';

class Video extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.seeking) {
      this.video.currentTime = nextProps.currentTime;
    }

    nextProps.playing ? this.video.play() : this.video.pause();
    this.video.muted = nextProps.muted;
  }

  onLoadedData = (event) => {
    this.props.onUpdateCurrentTime(0);
    this.props.onUpdateDuration(event.target.duration);
  }

  onTimeUpdate = (event) => {
    this.props.onUpdateCurrentTime(event.target.currentTime);
    this.props.updateCurrentBlock(event.target.currentTime);
  }

  onEnded = () => {
    this.props.onEndPlay();
  }

  render() {
    return (
      <div styleName="viewer">
        <video
          styleName="video"
          ref={(node) => { this.video = node; }}
          src={this.props.videoPath}
          onLoadedData={this.onLoadedData}
          onTimeUpdate={this.onTimeUpdate}
          onEnded={this.onEnded} />
        <SubtitleBox
          blocks={this.props.blocks}
          currentBlockId={this.props.currentBlockId}
          updateBlockText={this.props.updateBlockText} />
      </div>
    );
  }
}

Video.propTypes = {
  videoPath: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  seeking: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  blocks: PropTypes.array.isRequired,
  currentBlockId: PropTypes.number.isRequired,
  onUpdateCurrentTime: PropTypes.func.isRequired,
  onUpdateDuration: PropTypes.func.isRequired,
  onEndPlay: PropTypes.func.isRequired,
  updateCurrentBlock: PropTypes.func.isRequired,
  updateBlockText: PropTypes.func.isRequired,
};

export default CSSModules(Video, styles);
