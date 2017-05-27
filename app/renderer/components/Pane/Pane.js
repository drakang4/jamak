import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
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
      <div styleName="pane" style={style}>
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

export default CSSModules(Pane, styles);
