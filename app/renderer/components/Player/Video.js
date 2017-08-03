import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './styles.css';

class Video extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      
    }

    if (nextProps.seeking) {
      this.video.currentTime = nextProps.currentTime;
    }

    nextProps.playing ? this.play() : this.pause();
    this.video.muted = nextProps.muted;
  }

  play = () => {
    this.video.play();
  }

  pause = () => {
    this.video.pause();
  }

  handleLoadedData = (event) => {
    // const { onLoadedData } = this.props;
    // onLoadedData();
  }

  handleTimeUpdate = (event) => {
    const { onTimeUpdate } = this.props;
    onTimeUpdate(event.target.currentTime);
  }

  handleEnded = () => {
    const { onEnded } = this.props;
    onEnded();
  }

  render() {
    const {
      src,
    } = this.props;

    return (
      <video
        ref={(node) => { this.video = node; }}
        className={styles.video}
        src={src}
        onLoadedData={this.handleLoadedData}
        onTimeUpdate={this.handleTimeUpdate}
        onEnded={this.handleEnded}
      />
    );
  }
}

Video.propTypes = {
  src: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  seeking: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  onLoadedData: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  onEnded: PropTypes.func.isRequired,
};

export default Video;
