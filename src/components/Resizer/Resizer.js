import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames/bind';
import styles from './styles.css';

const cx = classNames.bind(styles);

class Resizer extends Component {
  mouseDown = (event) => {
    event.preventDefault();
    this.props.onMouseDown(event);
  }

  render() {
    const { type, active, disabled } = this.props;
    const className = cx({
      resizer: true,
      [`${type}`]: true,
      active,
      disabled,
    });

    return (
      <span
        className={className}
        onMouseDown={this.mouseDown} />
    );
  }
}

Resizer.propTypes = {
  type: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  active: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
};

export default CSSModules(Resizer, styles);
