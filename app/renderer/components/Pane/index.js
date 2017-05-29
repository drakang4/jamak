import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './styles.css';

class Pane extends Component {
  render() {
    const { type, primary, size, children } = this.props;

    const style = {};

    if (primary) {
      style.flex = 'none';
      if (type === 'vertical') {
        style.width = size;
      } else if (type === 'horizontal') {
        style.height = size;
      }
    }

    return (
      <div className={styles.root} style={style}>
        {children}
      </div>
    );
  }
}

Pane.propTypes = {
  type: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  primary: PropTypes.bool,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  children: PropTypes.node.isRequired,
};

Pane.defaultProps = {
  primary: false,
};

export default Pane;
