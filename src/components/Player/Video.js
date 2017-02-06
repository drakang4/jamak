import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import SubtitleBox from './SubtitleBox';
import styles from './styles.css';

class Video extends Component {
  componentWillReceiveProps(nextProps) {
    nextProps.playing ? this.video.play() : this.video.pause();
    this.video.muted = nextProps.muted;
  }

  onLoadedData = (event) => {
    this.props.onUpdateCurrentTime(0);
    this.props.onUpdateDuration(event.target.duration);
  }

  onTimeUpdate = (event) => {
    this.props.onUpdateCurrentTime(event.target.currentTime);
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
        <SubtitleBox />
      </div>
    );
  }
}

Video.propTypes = {
  videoPath: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  onUpdateCurrentTime: PropTypes.func.isRequired,
  onUpdateDuration: PropTypes.func.isRequired,
  onEndPlay: PropTypes.func.isRequired,
};

export default CSSModules(Video, styles);
