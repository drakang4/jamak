import PropTypes from 'prop-types';
import React, { Component, Children } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import Pane from '../Pane';
import Resizer from '../Resizer';

import styles from './styles.css';

class Split extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
    defaultSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    disableResize: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
  };

  static defaultProps = {
    defaultSize: '50%',
    disableResize: false,
  };

  state = {
    active: false,
    position: this.props.defaultSize,
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown = (event) => {
    if (this.props.disableResize) return;

    const position = this.props.type === 'vertical' ? event.clientX : event.clientY;
    this.setState({
      active: true,
      position,
    });
  }

  onMouseMove = (event) => {
    if (this.props.disableResize) return;

    if (this.state.active) {
      const node = findDOMNode(this.pane1);
      const { width, height } = node.getBoundingClientRect();
      const current = this.props.type === 'vertical' ? event.clientX : event.clientY;
      this.setState({ position: current });
    }
  }

  onMouseUp = (event) => {
    if (this.props.disableResize) return;

    if (this.state.active) {
      this.setState({ active: false });
    }
  }

  render() {
    const { children, type } = this.props;
    if (Children.count(children) !== 2) {
      throw new Error('Split must have two children');
    }

    const classes = classNames(styles.split, {
      [styles[`${type}`]]: true,
    });

    return (
      <div
        ref={(node) => { this.container = node; }}
        className={classes}
      >
        <Pane
          ref={(node) => { this.pane1 = node; }}
          primary
          type={type}
          size={this.state.position}
        >
          {children[0]}
        </Pane>
        <Resizer
          ref={(node) => { this.resizer = node; }}
          type={type}
          active={this.state.active}
          disabled={this.props.disableResize}
          onMouseDown={this.onMouseDown}
        />
        <Pane
          ref={(node) => { this.pane2 = node; }}
          type={type}
        >
          {children[1]}
        </Pane>
      </div>
    );
  }
}

export default Split;
