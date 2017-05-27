import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PrepareDropzone from '../components/PrepareDropzone/PrepareDropzone';
import * as fileActions from '../actions/file';

class Prepare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: false,
      subtitle: false,
    };
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
        videoReady={video}
        subtitleReady={subtitle}
        onVideoOpen={this.onVideoOpen}
        onSubtitleOpen={this.onSubtitleOpen}
        onSubtitleNew={this.onSubtitleNew} />
    );
  }
}

Prepare.propTypes = {
  loadFile: PropTypes.func.isRequired,
  loadVideo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(fileActions, dispatch)
);

export default connect(null, mapDispatchToProps)(Prepare);
