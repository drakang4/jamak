import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './styles.css';

class Resizer extends Component {
  mouseDown = (event) => {
    event.preventDefault();
    this.props.onMouseDown(event);
  }

  render() {
    const { type, active, disabled } = this.props;
    const classes = classNames(styles.resizer, {
      [styles[`${type}`]]: true,
      [styles.active]: active,
      [styles.disabled]: disabled,
    });

    return (
      <span className={classes} onMouseDown={this.mouseDown} />
    );
  }
}

Resizer.propTypes = {
  type: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  active: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
};

export default Resizer;
