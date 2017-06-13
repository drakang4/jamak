import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import styles from './styles.css';
import { playerToSrt } from '../../utils/timeParser';

const TimeBar = ({ currentTime, duration }) => (
  <div className={styles.timeBar}>
    <span className={classNames(styles.time, styles.left)}>{playerToSrt(currentTime)}</span>
    <span className={classNames(styles.time, styles.right)}>{playerToSrt(duration)}</span>
  </div>
);

TimeBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export default TimeBar;
