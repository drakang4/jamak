import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Indicator from './Indicator';
import styles from './styles.css';

const ProgressBar = props => {
  return (
    <div>
      <Indicator />
    </div>
  );
};

ProgressBar.propTypes = {
  
};

export default CSSModules(ProgressBar, styles);
