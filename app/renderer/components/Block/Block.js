import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Ink from 'react-ink';

import styles from './styles.css';

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
    const classes = classNames(styles.block, {
      [styles.current]: this.props.current,
      [styles.selected]: this.props.selected,
    });
    return (
      <div
        className={classes}
        style={{ left: `${this.state.position}%`, width: `${this.state.width}%` }}
        onMouseDown={this.onMouseDown}
      >
        <Ink />
        <div className={styles.progress} />
        <div className={styles.textbox}>
          <p className={classNames(styles.text, styles.time)}>{this.props.id} {this.props.startTime} → {this.props.endTime}</p>
          <p className={classNames(styles.text, styles.subtitle)}>{this.props.subtitle}</p>
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
  onSelectBlock: PropTypes.func.isRequired,
};

export default Block;
