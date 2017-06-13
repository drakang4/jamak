import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Ink from 'react-ink';
import { playerToSrt } from '../../utils/timeParser';

import styles from './styles.css';

class Block extends Component {
  onMouseDown = (event) => {
    event.preventDefault();

    if (!this.props.selected) {
      this.props.onSelect(this.props.id);
    }

    let timelineWidth = event.currentTarget.parentNode.offsetWidth;
    let blockWidth = event.currentTarget.offsetWidth;
    let blockLeft = event.currentTarget.offsetLeft;
    let blockRight = timelineWidth - blockLeft - blockWidth;

    const mouseMoveListener = (event) => {
      blockLeft += event.movementX;
      blockRight -= event.movementX;

      // Block must be in range of timeline
      if (blockLeft < 0) {
        blockLeft = 0;
      }
      if (blockRight < 0) {
        blockLeft = timelineWidth - blockWidth;
        blockRight = 0;
      }
      
      let startTime = Number((blockLeft / timelineWidth * this.props.duration).toFixed(6));
      let endTime = Number((startTime + this.props.endTime - this.props.startTime).toFixed(6));

      this.props.updateTime(this.props.id, startTime, endTime);
    };

    const mouseUpListener = (event) => {
      this.handleFinish();
      document.removeEventListener('mousemove', mouseMoveListener);
      document.removeEventListener('mouseup', mouseUpListener);
    };

    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('mouseup', mouseUpListener);
  }

  handleFinish = () => {

  }

  render() {
    const {
      currentTime,
      duration,
      id,
      startTime,
      endTime,
      subtitle,
      current,
      selected,
      hover,
      onCurrent,
      onSelect,
      onDelete,
      updateTime,
      handleHover,
    } = this.props;

    const length = parseFloat((endTime - startTime).toFixed(3));
    const width = (length / duration) * 100;
    const position = (startTime / duration) * 100;

    return (
      <div
        className={classNames(styles.block, {
          [styles.selected]: selected,
        })}
        style={{ left: `${position}%`, width: `${width}%` }}
        onMouseDown={this.onMouseDown}
        onMouseOver={handleHover}
        onMouseOut={handleHover}
      >
        <div
          style={{ transform: `scaleX(${current ? 1 : 0})`, width: `${((currentTime - startTime) / length) * 100}%` }}
          className={styles.progress}
        />
        <div className={styles.textbox}>
          <p className={classNames(styles.text, styles.time)}>
            {id} {playerToSrt(startTime)} → {playerToSrt(endTime)}
          </p>
          <p className={classNames(styles.text, styles.subtitle)}>
            {subtitle}
          </p>
        </div>
        <Ink />
      </div>
    );
  }
}

Block.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  subtitle: PropTypes.string.isRequired,
  current: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  onCurrent: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  updateTime: PropTypes.func.isRequired,
  handleHover: PropTypes.func.isRequired,
};

export default Block;
