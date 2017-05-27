import PropTypes from 'prop-types';
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

const Button = ({ onClick, children }) => (
  <button styleName="button"
    onClick={onClick}>{children}</button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default CSSModules(Button, styles);
