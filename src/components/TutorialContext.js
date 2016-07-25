import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
const { dialog } = require('electron').remote;
const { fileOpen, fileNew } = require('../utils/file');

class TutorialContext extends Component {
  handleSubtitleOpen(filenames) {

  }

  handleVideoOpen(filenames) {
    fileOpen(filenames);
  }

  handleChooseVideo() {
    dialog.showOpenDialog({
      properties: ['fileOpen'],
      filters: [
        { name: 'Video Files', extensions: ['mp4', 'webm', 'ogg']},
        { name: 'All Files', extensions: ['*'] }
      ]}, (filenames) => {
      fileOpen(filenames);
    });
  }

  handleNewFile() {
    fileNew();
  }

  getContext() {
    if(this.props.step == 1) {
      return(
        <div className="tutorial__context">
          <p className="tutorial__text">Drop your video file here</p>
          <p className="tutorial__text">to create or edit subtitle</p>
          <div className="tutorial__icon tutorial__icon--load"></div>
          <p className="tutorial__text">Or</p>
          <button className="tutorial__button" onClick={this.handleChooseVideo}>Choose file</button>
        </div>
      );
    } else if(this.props.step == 2) {
      return(
        <div className="tutorial__context">
          <p className="tutorial__text">Drop your subtitle file here</p>
          <div className="tutorial__icon tutorial__icon--load"></div>
          <p className="tutorial__text">Or</p>
          <button className="tutorial__button" onClick={this.handleNewFile}>New file</button>
        </div>
      );
    } else if(this.props.step == 3) {
      return(
        <div className="tutorial__context">
        </div>
      );
    }
  }

  render() {
    return (
      this.getContext()
    );
  }
}

TutorialContext.propTypes = {
  step: PropTypes.number.isRequired
};

export default connect()(TutorialContext);
