import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import TimeBar from './TimeBar';
import ProgressBar from './ProgressBar';
import Indicator from './Indicator';
import Blocks from './Blocks';
import styles from './styles.css';

const Timeline = (props) => {
  const {
    blocks,
    currentTime,
    duration,
    seeking,
    currentBlockId,
    selectedBlockId,
    currentBlock,
    selectBlock,
    startSeek,
    doingSeek,
    endSeek,
  } = props;
  const rate = currentTime / duration;
  return (
    <div styleName="timeline">
      <TimeBar currentTime={currentTime} duration={duration} />
      <div styleName="workspace">
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          seeking={seeking}
          startSeek={startSeek}
          doingSeek={doingSeek}
          endSeek={endSeek} />
        <div styleName="lines">
          <Blocks
            blocks={blocks}
            duration={duration}
            currentBlockId={currentBlockId}
            selectedBlockId={selectedBlockId}
            currentBlock={currentBlock}
            selectBlock={selectBlock} />
          {/*<AudioGraph />*/}
        </div>
        <Indicator rate={rate} />
      </div>
    </div>
  );
};

Timeline.propTypes = {
  blocks: PropTypes.array.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  seeking: PropTypes.bool.isRequired,
  currentBlockId: PropTypes.number.isRequired,
  selectedBlockId: PropTypes.number.isRequired,
  currentBlock: PropTypes.func.isRequired,
  selectBlock: PropTypes.func.isRequired,
  startSeek: PropTypes.func.isRequired,
  doingSeek: PropTypes.func.isRequired,
  endSeek: PropTypes.func.isRequired,
};

export default CSSModules(Timeline, styles);
