import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

const Indicator = ({ rate }) => {
  return (
    <div
      styleName="indicator"
      style={{ left: `${rate * 100}%` }} >
      <div styleName="indicator-head" />
      <div styleName="indicator-line" />
    </div>
  );
};

Indicator.propTypes = {
  rate: PropTypes.number.isRequired,
};

export default CSSModules(Indicator, styles);
