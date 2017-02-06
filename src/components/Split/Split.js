import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import CSSModules from 'react-css-modules';
import classNames from 'classnames/bind';
import Pane from '../Pane/Pane';
import Resizer from '../Resizer/Resizer';
import styles from './styles.css';

const cx = classNames.bind(styles);

class Split extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      position: 400,
    };
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseDown = (event) => {
    const position = this.props.type === 'vertical' ? event.clientX : event.clientY;
    this.setState({
      active: true,
      position,
    });
  }

  onMouseMove = (event) => {
    if (this.state.active) {
      const node = findDOMNode(this.pane1);
      const width = node.getBoundingClientRect().width;
      const height = node.getBoundingClientRect().height;
      const current = this.props.type === 'vertical' ? event.clientX : event.clientY;
      this.setState({ position: current });
    }
  }

  onMouseUp = (event) => {
    if (this.state.active) {
      this.setState({ active: false });
    }
  }

  render() {
    const { children, type } = this.props;
    const className = cx({
      split: true,
      [`${type}`]: true,
    });

    return (
      <div
        ref={(node) => { this.container = node; }}
        className={className}>
        <Pane
          ref={(node) => { this.pane1 = node; }}
          primary
          type={type}
          size={this.state.position}>
          {children[0]}
        </Pane>
        <Resizer
          ref={(node) => { this.resizer = node; }}
          type={type}
          active={this.state.active}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp} />
        <Pane
          ref={(node) => { this.pane2 = node; }}
          type={type}>
          {children[1]}
        </Pane>
      </div>
    );
  }
}

Split.propTypes = {
  type: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default CSSModules(Split, styles);
