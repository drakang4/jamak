import React, { Component } from 'react';
import PrepareDropzone from '../components/PrepareDropzone/PrepareDropzone';

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
      <PrepareDropzone videoReady={video} subtitleReady={subtitle}
        onVideoOpen={this.onVideoOpen}
        onSubtitleOpen={this.onSubtitleOpen}
        onSubtitleNew={this.onSubtitleNew} />
    );
  }
}

export default Prepare;
