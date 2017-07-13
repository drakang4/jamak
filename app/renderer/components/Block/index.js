import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Ink from 'react-ink';
import { playerToSrt } from '../../utils/timeParser';

import styles from './styles.css';

class Block extends Component {
  handleMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();

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
      document.removeEventListener('mousemove', mouseMoveListener);
      document.removeEventListener('mouseup', mouseUpListener);
    };

    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('mouseup', mouseUpListener);
  }

  handleDoubleClick = () => {
    this.props.startSeek(this.props.startTime);
    this.props.endSeek();
  }

  handleTimerDown = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!this.props.selected) {
      this.props.onSelect(this.props.id);
    }

    let timer = event.currentTarget;
    let timelineWidth = timer.parentNode.parentNode.offsetWidth;
    let blockWidth = timer.parentNode.offsetWidth;
    let blockLeft = timer.parentNode.offsetLeft;
    let blockRight = timelineWidth - blockLeft - blockWidth;

    const timerMoveListener = (event) => {
      let position;
      let width;
      let startTime, endTime;

      if (timer.classList[1] === styles.left) {
        blockLeft += event.movementX;
        blockWidth -= event.movementX;

        // Block must be in range of timeline;
        if (blockLeft < 0) {
          blockLeft = 0;
          blockWidth += event.movementX;
        }

        position = blockLeft / timelineWidth * 100;
        width = blockWidth / timelineWidth * 100;

        startTime = Number((position / 100 * this.props.duration).toFixed(6));
        endTime = this.props.endTime;
      } else {
        blockWidth += event.movementX;
        blockRight -= event.movementX;

        // Block must be in range of timeline.
        if (blockRight < 0) {
          blockRight = 0;
          blockWidth -= e.movementX;
        }

        position = blockLeft / timelineWidth * 100;
        width = blockWidth / timelineWidth * 100;

        startTime = this.props.startTime;
        endTime = Number(((blockLeft + blockWidth) / timelineWidth * this.props.duration).toFixed(6));
      }
      this.props.updateTime(this.props.id, startTime, endTime);
    };

    const timerUpListener = () => {
      document.removeEventListener('mousemove', timerMoveListener);
      document.removeEventListener('mouseup', timerUpListener);
    };

    document.addEventListener('mousemove', timerMoveListener);
    document.addEventListener('mouseup', timerUpListener);
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
      startSeek,
      endSeek,
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
        onMouseDown={this.handleMouseDown}
        onMouseOver={handleHover}
        onMouseOut={handleHover}
        onDoubleClick={this.handleDoubleClick}
      >
        <Ink />
        <div
          style={{ transform: `scaleX(${current ? 1 : 0})`, width: `${((currentTime - startTime) / length) * 100}%` }}
          className={styles.progress}
        />
        <div
          style={{ display: hover ? 'block' : 'none' }}
          className={classNames(styles.timer, styles.left)}
          onMouseDown={this.handleTimerDown}
        />
        <div className={styles.textbox}>
          <p className={classNames(styles.text, styles.time)}>
            {id} {playerToSrt(startTime)} → {playerToSrt(endTime)}
          </p>
          <p className={classNames(styles.text, styles.subtitle)}>
            {subtitle}
          </p>
        </div>
        <div
          style={{ display: hover ? 'block' : 'none' }}
          className={classNames(styles.timer, styles.right)}
          onMouseDown={this.handleTimerDown}
        />
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
  startSeek: PropTypes.func.isRequired,
  endSeek: PropTypes.func.isRequired,
  updateTime: PropTypes.func.isRequired,
  handleHover: PropTypes.func.isRequired,
};

export default Block;
