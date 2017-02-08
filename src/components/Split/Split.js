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
      position: this.props.defaultSize,
    };
  }

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
          disabled={this.props.disableResize}
          onMouseDown={this.onMouseDown} />
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
  defaultSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disableResize: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

Split.defaultProps = {
  defaultSize: '50%',
  disableResize: false,
};

export default CSSModules(Split, styles);
