import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.css';

const Indicator = ({ rate }) => {
  const onMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className={styles.indicator}
      style={{ left: `${rate * 100}%` }}
      onMouseDown={onMouseDown}
    >
      <div className={styles.indicatorHead} />
      <div className={styles.indicatorLine} />
    </div>
  );
};

Indicator.propTypes = {
  rate: PropTypes.number.isRequired,
};

export default Indicator;
