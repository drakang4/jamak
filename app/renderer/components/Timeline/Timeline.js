import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import TimeBar from './TimeBar';
import ProgressBar from './ProgressBar';
import Indicator from './Indicator';
import Blocks from './Blocks';
import styles from './styles.css';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiple: 1,
    };
  }

  onWheel = (event) => {
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
      selectBlock,
      startSeek,
      doingSeek,
      endSeek,
    } = this.props;
    const rate = currentTime / duration;

    return (
      <div styleName="timeline">
        <TimeBar currentTime={currentTime} duration={duration} />
        <div styleName="wrapper">
          <div
            styleName="workspace"
            style={{ width: `${100 * this.state.multiple}%` }}>
            <ProgressBar
              currentTime={currentTime}
              duration={duration}
              seeking={seeking}
              startSeek={startSeek}
              doingSeek={doingSeek}
              endSeek={endSeek} />
            <div
              styleName="lines"
              onWheel={this.onWheel}>
              <Blocks
                blocks={blocks}
                duration={duration}
                currentBlockId={currentBlockId}
                selectedBlockId={selectedBlockId}
                selectBlock={selectBlock} />
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
  selectBlock: PropTypes.func.isRequired,
  startSeek: PropTypes.func.isRequired,
  doingSeek: PropTypes.func.isRequired,
  endSeek: PropTypes.func.isRequired,
};

export default CSSModules(Timeline, styles);
