import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

const Indicator = ({ rate }) => {
  const onMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      styleName="indicator"
      style={{ left: `${rate * 100}%` }}
      onMouseDown={onMouseDown} >
      <div styleName="indicator-head" />
      <div styleName="indicator-line" />
    </div>
  );
};

Indicator.propTypes = {
  rate: PropTypes.number.isRequired,
};

export default CSSModules(Indicator, styles);
