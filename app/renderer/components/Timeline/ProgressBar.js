import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

class ProgressBar extends Component {
  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown = (event) => {
    const { width, left } = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - left;
    const rate = offsetX / width;

    this.props.startSeek(rate * this.props.duration);
  }

  onMouseMove = (event) => {
    event.stopPropagation();
    if (this.props.seeking) {
      const { width, left } = this.bar.getBoundingClientRect();
      const offsetX = event.clientX - left;
      let rate = offsetX / width;

      console.log(rate);

      if (rate < 0) {
        rate = 0;
      } else if (rate > 1) {
        rate = 1;
      }
      this.props.doingSeek(rate * this.props.duration);
    }
  }

  onMouseUp = () => {
    if (this.props.seeking) {
      this.props.endSeek();
    }
  }

  render() {
    return (
      <div
        ref={(node) => { this.bar = node; }}
        styleName="progress-bar"
        onMouseDown={this.onMouseDown} />
    );
  }
}

ProgressBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  seeking: PropTypes.bool.isRequired,
  startSeek: PropTypes.func.isRequired,
  doingSeek: PropTypes.func.isRequired,
  endSeek: PropTypes.func.isRequired,
};

export default CSSModules(ProgressBar, styles);
