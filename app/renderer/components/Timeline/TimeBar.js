import PropTypes from 'prop-types';
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';
import { playerToSrt } from '../../utils/timeParser';

const TimeBar = ({ currentTime, duration }) => (
  <div styleName="time-bar">
    <span styleName="time left">{playerToSrt(currentTime)}</span>
    <span styleName="time right">{playerToSrt(duration)}</span>
  </div>
);

TimeBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export default CSSModules(TimeBar, styles, { allowMultiple: true });
