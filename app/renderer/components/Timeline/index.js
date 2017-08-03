import PropTypes from 'prop-types';
import React, { Component } from 'react';

import TimeBar from './TimeBar';
import ProgressBar from './ProgressBar';
import Indicator from './Indicator';
import BlockContainer from '../../containers/BlockContainer';

import styles from './styles.css';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiple: 1,
    };
  }

  handleWheel = (event) => {
    if (event.altKey) {
      if (event.deltaY > 0) {
        if (this.state.multiple > 1) {
          this.setState({ multiple: this.state.multiple / 2 });
        }
      } else {
        this.setState({ multiple: this.state.multiple * 2 });
      }
    }
  }

  render() {
    const {
      blocks,
      currentTime,
      duration,
      seeking,
      currentBlockId,
      selectedBlockId,
      onStartSeek,
      onDoingSeek,
      onEndSeek,
    } = this.props;
    const rate = currentTime / duration;

    return (
      <div className={styles.timeline}>
        <TimeBar currentTime={currentTime} duration={duration} />
        <div className={styles.wrapper}>
          <div
            className={styles.workspace}
            style={{ width: `${100 * this.state.multiple}%` }}
          >
            <ProgressBar
              currentTime={currentTime}
              duration={duration}
              seeking={seeking}
              onStartSeek={onStartSeek}
              onDoingSeek={onDoingSeek}
              onEndSeek={onEndSeek}
            />
            <div
              className={styles.lines}
              onWheel={this.handleWheel}
            >
              <div className={styles.line}>
                {blocks.map(block => (
                  <BlockContainer
                    key={block.id}
                    id={block.id}
                    currentTime={currentTime}
                    duration={duration}
                    startTime={block.startTime}
                    endTime={block.endTime}
                    subtitle={block.subtitle}
                    current={currentBlockId === block.id}
                    selected={selectedBlockId === block.id}
                  />
                ))}
              </div>
              {/*<AudioGraph />*/}
            </div>
            <Indicator rate={rate} />
          </div>
        </div>
      </div>
    );
  }
}

Timeline.propTypes = {
  blocks: PropTypes.array.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  seeking: PropTypes.bool.isRequired,
  currentBlockId: PropTypes.number.isRequired,
  selectedBlockId: PropTypes.number.isRequired,
  onStartSeek: PropTypes.func.isRequired,
  onDoingSeek: PropTypes.func.isRequired,
  onEndSeek: PropTypes.func.isRequired,
};

export default Timeline;
