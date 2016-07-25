import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { playerToSrt } from '../utils/timeParser';

class TimeBar extends Component {
  render() {
    return (
      <div className="time-bar">
        <span className="time-bar__time time-bar__time--left">{playerToSrt(this.props.currentTime)}</span>
        <span className="time-bar__time time-bar__time--right">{playerToSrt(this.props.duration)}</span>
      </div>
    );
  }
}

TimeBar.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    currentTime: state.player.currentTime,
    duration: state.player.duration
  };
};

export default connect(mapStateToProps)(TimeBar);
