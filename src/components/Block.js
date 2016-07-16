import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Actions from '../actions';
import classNames from 'classnames';
import Ink from 'react-ink';

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: this.props.startTime / this.props.duration * 100,
      length: this.props.endTime - this.props.startTime,
      width: (this.props.endTime - this.props.startTime) / this.props.duration * 100,
      hover: false
    };
  }

  handleBlockOver(e) {
    e.stopPropagation();
    this.setState({ hover: true });
  }

  handleBlockOut(e) {
    e.stopPropagation();
    this.setState({ hover: false });
  }

  handleBlockDown(e) {
    e.preventDefault();
    e.stopPropagation();
    if(!this.props.isSelected)
      this.props.selectBlock(this.props.id);


    let timelineWidth = e.currentTarget.parentNode.offsetWidth;
    let blockWidth = e.currentTarget.offsetWidth;
    let blockLeft = e.currentTarget.offsetLeft;
    let blockRight = timelineWidth - blockLeft - blockWidth;

    let blockMoveListener = (e) => {
      blockLeft += e.movementX;
      blockRight -= e.movementX;

      /**
      * A block must be in range of timeline
      */
      if(blockLeft < 0) {
        blockLeft = 0;
      }
      if(blockRight < 0) {
        blockLeft = timelineWidth - blockWidth;
        blockRight = 0;
      }

      let position = blockLeft / timelineWidth * 100;
      this.setState({ position: position });

      let startTime = Number((this.state.position / 100 * this.props.duration).toFixed(6));
      let endTime = Number((startTime + this.state.length).toFixed(6));

      this.props.updateBlockTime(startTime, endTime);
    };

    let blockUpListener = (e) => {
      document.removeEventListener('mousemove', blockMoveListener);
      document.removeEventListener('mouseup', blockUpListener);
    };

    document.addEventListener('mousemove', blockMoveListener);
    document.addEventListener('mouseup', blockUpListener);
  }

  handleTimerDown(e) {
    e.preventDefault();
    e.stopPropagation();
    if(!this.props.isSelected)
      this.props.selectBlock(this.props.id);

    let timer = e.currentTarget;
    let timelineWidth = timer.parentNode.parentNode.offsetWidth;
    let blockWidth = timer.parentNode.offsetWidth;
    let blockLeft = timer.parentNode.offsetLeft;
    let blockRight = timelineWidth - blockLeft - blockWidth;

    let timerMoveListener = (e) => {
      if (timer.classList[0] == 'block__timer') {
        let position;
        let width;
        let startTime, endTime;

        if (timer.classList[1] == 'block__timer--before') {
          blockLeft += e.movementX;
          blockWidth -= e.movementX;

          /**
          * A block must be in range of timeline.
          */
          if(blockLeft < 0) {
            blockLeft = 0;
            blockWidth += e.movementX;
          }

          position = blockLeft / timelineWidth * 100;
          width = blockWidth / timelineWidth * 100;

          startTime = Number((position / 100 * this.props.duration).toFixed(6));
          endTime = this.props.endTime;

        } else if (timer.classList[1] == 'block__timer--after') {
          blockWidth += e.movementX;
          blockRight -= e.movementX;

          /**
          * A block must be in range of timeline.
          */
          if(blockRight < 0) {
            blockRight = 0;
            blockWidth -= e.movementX;
          }

          position = blockLeft / timelineWidth * 100;
          width = blockWidth / timelineWidth * 100;

          startTime = this.props.startTime;
          endTime = Number(((blockLeft + blockWidth) / timelineWidth * this.props.duration).toFixed(6));
        }

        this.setState({ position: position, width: width, length: endTime - startTime });
        this.props.updateBlockTime(startTime, endTime);
      }
    };

    let timerUpListener = (e) => {
      document.removeEventListener('mousemove', timerMoveListener);
      document.removeEventListener('mouseup', timerUpListener);
    };
    document.addEventListener('mousemove', timerMoveListener);
    document.addEventListener('mouseup', timerUpListener);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      position: nextProps.startTime / nextProps.duration * 100,
      length: nextProps.endTime - nextProps.startTime,
      width: (nextProps.endTime - nextProps.startTime) / nextProps.duration * 100,
    });
  }

  render() {
    let blockClass = classNames({
      'block': true,
      'block--selected': this.props.isSelected
    });

    return (
      <div
        className={blockClass}
        style={{ left: this.state.position + '%', width: this.state.width + '%' }}
        onMouseDown={this.handleBlockDown.bind(this)}
        onMouseOver={this.handleBlockOver.bind(this)}
        onMouseOut={this.handleBlockOut.bind(this)}>
        <Ink />
        <div
          style={{ transform: 'scaleX(' + (this.props.isCurrent ? 1 : 0) + ')', width: (this.props.currentTime - this.props.startTime) / (this.props.endTime - this.props.startTime) * 100 + '%' }}
          className="block__progress"></div>
        <div
          style={{ display: this.state.hover ? 'block' : 'none' }}
          className="block__timer block__timer--before"
          onMouseDown={this.handleTimerDown.bind(this)}></div>
        <div className="block__wrapper">
          <p className="block__text block__text--time">{this.props.id}　{this.props.startTime} → {this.props.endTime}</p>
          <p className="block__text block__text--subtitle">{this.props.subtitle}</p>
        </div>
        <div
          style={{ display: this.state.hover ? 'block' : 'none' }}
          className="block__timer block__timer--after"
          onMouseDown={this.handleTimerDown.bind(this)}></div>
      </div>
    );
  }
}

Block.propTypes = {
  selectBlock: PropTypes.func.isRequired,
  updateBlockTime: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  subtitle: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  currentTime: PropTypes.number,
  duration: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    currentTime: state.player.currentTime,
    duration: state.player.duration
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectBlock: (id) => dispatch(Actions.selectBlock(id)),
    updateBlockTime: (startTime, endTime) => dispatch(Actions.updateBlockTime(startTime, endTime))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Block);
