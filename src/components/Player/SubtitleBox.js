import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

const SubtitleBox = props => {
  return (
    <div styleName="subtitle-box">
      <textarea styleName="textarea" />
    </div>
  );
};

SubtitleBox.propTypes = {
  
};

export default CSSModules(SubtitleBox, styles);
