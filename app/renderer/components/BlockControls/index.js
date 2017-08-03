import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import styles from './styles.css';

const BlockControls = ({
  onAddBlock, onClearBlock, onDeleteBlock,
  selectedBlockId, currentTime, duration,
}) => {
  return (
    <div className={styles.controls}>
      <button
        className={classNames(styles.button, styles.add)}
        onClick={() => onAddBlock(currentTime, duration)}
      >
        <svg viewBox="0 0 36 36">
          <path d="M28.5,19.5h-9v9h-3v-9h-9v-3h9v-9h3v9h9v3Z" />
        </svg>
      </button>
      <button
        className={classNames(styles.button, styles.clear)}
        onClick={() => onClearBlock(selectedBlockId)}
      >
        <svg viewBox="0 0 36 36">
          <path d="M26.47,9.52A12,12,0,1,0,29.59,21H26.47A9,9,0,1,1,18,9a8.87,8.87,0,0,1,6.33,2.67L19.5,16.5H30V6Z" />
        </svg>
      </button>
      <button
        className={classNames(styles.button, styles.delete)}
        onClick={() => onDeleteBlock(selectedBlockId)}
      >
        <svg viewBox="0 0 36 36">
          <path d="M28.5,9.61L26.38,7.5,18,15.89,9.61,7.5,7.5,9.61,15.88,18,7.5,26.39,9.61,28.5,18,20.11l8.39,8.39,2.11-2.11L20.11,18Z" />
        </svg>
      </button>
    </div>
  );
};

BlockControls.propTypes = {
  onAddBlock: PropTypes.func.isRequired,
  onClearBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  selectedBlockId: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export default BlockControls;
