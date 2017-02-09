import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames/bind';
import Ink from 'react-ink';
import styles from './styles.css';

const cx = classNames.bind(styles);

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: parseFloat((props.endTime - props.startTime).toFixed(3)),
      width: ((props.endTime - props.startTime) / props.duration) * 100,
      position: (props.startTime / props.duration) * 100,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      length: parseFloat((nextProps.endTime - nextProps.startTime).toFixed(3)),
      width: ((nextProps.endTime - nextProps.startTime) / nextProps.duration) * 100,
      position: (nextProps.startTime / nextProps.duration) * 100,
    });
  }

  onMouseDown = (event) => {
    if (!this.props.selected) {
      this.props.onSelectBlock(this.props.id);
    }
  }

  render() {
    const className = cx({
      block: true,
      current: this.props.current,
      selected: this.props.selected,
    });
    return (
      <div
        className={className}
        style={{ left: `${this.state.position}%`, width: `${this.state.width}%` }}
        onMouseDown={this.onMouseDown}>
        <Ink />
        <div styleName="progress" />
        <div styleName="textbox">
          <p styleName="text time">{this.props.id} {this.props.startTime} → {this.props.endTime}</p>
          <p styleName="text subtitle">{this.props.subtitle}</p>
        </div>
      </div>
    );
  }
}

Block.propTypes = {
  duration: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  subtitle: PropTypes.string.isRequired,
  current: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  onCurrentBlock: PropTypes.func.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
};

export default CSSModules(Block, styles, { allowMultiple: true });
