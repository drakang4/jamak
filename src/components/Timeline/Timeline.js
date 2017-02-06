import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import TimeBar from './TimeBar';
import ProgressBar from './ProgressBar';
import Blocks from './Blocks';
import styles from './styles.css';

const Timeline = () => {
  return (
    <div styleName="timeline">
      <TimeBar currentTime duration />
      <div>
        <ProgressBar />
        <div>
          <Blocks />
          {/* <AudioGraph /> */}
        </div>
      </div>
    </div>
  );
};

Timeline.propTypes = {
  
};

export default CSSModules(Timeline, styles);
