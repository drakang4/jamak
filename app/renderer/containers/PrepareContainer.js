import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PrepareDropzone from '../components/PrepareDropzone';
import * as fileActions from '../actions/file';

class PrepareContainer extends Component {
  static propTypes = {
    subtitleFilename: PropTypes.string,
    videoFilename: PropTypes.string,
    loadFile: PropTypes.func.isRequired,
    loadVideo: PropTypes.func.isRequired,
  }

  state = {
    video: false,
    subtitle: false,
  }

  onVideoOpen = () => {
    this.setState({ video: true });
  }

  onSubtitleOpen = () => {
    this.setState({ subtitle: true });
  }

  onSubtitleNew = () => {
    this.setState({ subtitle: true });
  }

  render() {
    const { video, subtitle } = this.state;
    return (
      <PrepareDropzone
        subtitleFilename={this.props.subtitleFilename}
        videoFilename={this.props.videoFilename}
        videoReady={video}
        subtitleReady={subtitle}
        onVideoOpen={this.onVideoOpen}
        onSubtitleOpen={this.onSubtitleOpen}
        onSubtitleNew={this.onSubtitleNew}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  subtitleFilename: state.file.subtitleFilename,
  videoFilename: state.file.videoFilename,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(fileActions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PrepareContainer);
