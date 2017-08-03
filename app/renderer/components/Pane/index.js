import PropTypes from 'prop-types';
import React, { Component, Children } from 'react';

import styles from './styles.css';

class Pane extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
    primary: PropTypes.bool,
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    primary: false,
  }

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
      <div className={styles.pane} style={style}>
        {Children.only(children)}
      </div>
    );
  }
}

export default Pane;
