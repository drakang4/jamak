import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import styles from './styles.css';

const Button = ({ onClick, children, disabled, big, small }) => {
  const classes = classNames(styles.button, {
    [styles.disabled]: disabled,
    [styles.big]: big,
    [styles.small]: small,
  });

  return (
    <button
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  big: PropTypes.bool,
  small: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  big: false,
  small: false,
};

export default Button;
