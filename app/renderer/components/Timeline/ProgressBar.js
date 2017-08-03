import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './styles.css';

class ProgressBar extends Component {
  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown = (event) => {
    const { width, left } = this.bar.getBoundingClientRect();
    const offsetX = event.clientX - left;
    const rate = offsetX / width;

    this.props.onStartSeek(rate * this.props.duration);
  }

  handleMouseMove = (event) => {
    event.stopPropagation();
    if (this.props.seeking) {
      const { width, left } = this.bar.getBoundingClientRect();
      const offsetX = event.clientX - left;
      let rate = offsetX / width;

      if (rate < 0) {
        rate = 0;
      } else if (rate > 1) {
        rate = 1;
      }
      this.props.onDoingSeek(rate * this.props.duration);
    }
  }

  handleMouseUp = () => {
    if (this.props.seeking) {
      this.props.onEndSeek();
    }
  }

  render() {
    return (
      <div
        ref={(node) => { this.bar = node; }}
        className={styles.progressBar}
        onMouseDown={this.handleMouseDown}
      />
    );
  }
}

ProgressBar.propTypes = {
  duration: PropTypes.number.isRequired,
  seeking: PropTypes.bool.isRequired,
  onStartSeek: PropTypes.func.isRequired,
  onDoingSeek: PropTypes.func.isRequired,
  onEndSeek: PropTypes.func.isRequired,
};

export default ProgressBar;
