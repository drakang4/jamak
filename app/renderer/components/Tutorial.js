import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import TutorialContext from './TutorialContext';
import TutorialStepper from './TutorialStepper';
import path from 'path';
const { fileOpen } = require('../../app/file');

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };
  }

  handleDrop(file) {
    path.extname(file[0].path);
    // On drop a video file.
    if(this.state.step == 1) {
      fileOpen(file[0].path);
    }

    // On drop a subtitle file.
    if(this.state.step == 2) {
      fileOpen(file[0].path);
    }
  }

  componentWillMount() {
    document.addEventListener('dragover', (e) => {
      e.preventDefault();
      return false;
    });

    document.addEventListener('drop', (e) => {
      e.preventDefault();
      this.handleDrop.bind(this);
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.step == 1 && nextProps.url != '')
      this.setState({step: 2});
    if(this.state.step == 2 && nextProps.blockFilePath != '')
      this.setState({step: 3});
  }

  render() {
    let style = {
      display: this.props.url === null || this.props.blockFilePath === null ? 'block' : 'none'
    };

    return (
      <Dropzone
        className="tutorial"
        activeClassName="tutorial--active"
        style={style}
        onDrop={this.handleDrop.bind(this)}
        disableClick
        multiple={false} >
        <div className="tutorial__wrapper">
          <TutorialContext step={this.state.step} />
          <TutorialStepper step={this.state.step} />
        </div>
      </Dropzone>
    );
  }
}

Tutorial.propTypes = {
  url: PropTypes.string,
  blockFilePath: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    url: state.player.url,
    blockFilePath: state.blocks.blockFilePath
  };
};

export default connect(mapStateToProps)(Tutorial);
