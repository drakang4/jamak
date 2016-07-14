import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Indicator from './Indicator';
import Actions from '../actions';

class ProgressBar extends Component {
  handleProgressDown(e) {
    if(this.props.url=='') {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    let progressWidth = e.currentTarget.offsetWidth;
    let progressLeft = e.currentTarget.offsetLeft;
    let progressCoord = e.clientX - progressLeft;
    let progressRate = progressCoord / progressWidth;

    this.props.onProgressDown(progressRate);

    let mouseMoveListener = (e) => {
      e.preventDefault();
      e.stopPropagation();

      progressCoord = e.clientX - progressLeft;
      progressRate = progressCoord / progressWidth;

      if(progressRate < 0) {
        progressCoord = 0;
        progressRate = 0;
      }
      if (progressRate > 1) {
        progressCoord = progressWidth;
        progressRate = 1;
      }

      this.props.onProgressMove(progressRate);
    };

    let mouseUpListener = (e) => {
      e.preventDefault();
      e.stopPropagation();

      document.removeEventListener('mousemove', mouseMoveListener);
      document.removeEventListener('mouseup', mouseUpListener);
      this.props.onProgressUp();
    };

    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('mouseup', mouseUpListener);
  }

  render() {
    return (
      <div ref="progressBar"
           className="progress-bar"
           onMouseDown={this.handleProgressDown.bind(this)}>
        <Indicator />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  onProgressDown: PropTypes.func.isRequired,
  onProgressMove: PropTypes.func.isRequired,
  onProgressUp: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  seeking: PropTypes.bool.isRequired,
  progressRate: PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    url: state.player.url,
    seeking: state.player.seeking
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onProgressDown: (rate) => dispatch(Actions.downProgress(rate)),
    onProgressMove: (rate) => dispatch(Actions.moveProgress(rate)),
    onProgressUp: () => dispatch(Actions.upProgress())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);
