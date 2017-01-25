import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

const Button = (props) => (
  <button styleName="default"
    onClick={props.onClick}>{props.children}</button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default CSSModules(Button, styles);
