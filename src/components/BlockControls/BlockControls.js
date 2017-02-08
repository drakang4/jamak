import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

const BlockControls = props => {
  return (
    <div styleName="controls">
      <button styleName="button add">
        <svg viewBox="0 0 36 36">
          <path d="M28.5,19.5h-9v9h-3v-9h-9v-3h9v-9h3v9h9v3Z" />
        </svg>
      </button>
      <button styleName="button clear">
        <svg viewBox="0 0 36 36">
          <path d="M26.47,9.52A12,12,0,1,0,29.59,21H26.47A9,9,0,1,1,18,9a8.87,8.87,0,0,1,6.33,2.67L19.5,16.5H30V6Z" />
        </svg>
      </button>
      <button styleName="button delete">
        <svg viewBox="0 0 36 36">
          <path d="M28.5,9.61L26.38,7.5,18,15.89,9.61,7.5,7.5,9.61,15.88,18,7.5,26.39,9.61,28.5,18,20.11l8.39,8.39,2.11-2.11L20.11,18Z" />
        </svg>
      </button>
    </div>
  );
};

BlockControls.propTypes = {
  
};

export default CSSModules(BlockControls, styles, { allowMultiple: true });
