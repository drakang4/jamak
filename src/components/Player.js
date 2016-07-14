import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Video from './Video';
import VideoControls from './VideoControls';

class Player extends Component {
  render() {
    let style = {
      width: this.props.left
    };

    return (
      <div
        className="player"
        style={style}>
        <Video />
        <VideoControls />
      </div>
    );
  }
}

Player.propTypes = {
  left: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    left: state.resizer.left
  };
};

export default connect(mapStateToProps)(Player);
