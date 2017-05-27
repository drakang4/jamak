import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from './Video';
import VideoControls from './VideoControls';

class Player extends Component {
  render() {
    return (
      <div
        className="player">
        <Video />
        <VideoControls />
      </div>
    );
  }
}

export default Player;
