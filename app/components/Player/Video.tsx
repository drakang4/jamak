import React from 'react';
import styled from '../../styles/styled-components';
import SubtitleEditorContainer from '../../containers/SubtitleEditor';

const Wrapper = styled.div`
  position: relative;
  background-color: ${props => props.theme.pallete.black};
  flex: 1;
`;

const StyledVideo = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
`;

interface Props {
  source: string;
  playing: boolean;
  muted: boolean;
  seeking: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  onLoadedData(duration: number): void;
  onTimeUpdate(currentTime: number): void;
  onEnded(): void;
}

class Video extends React.Component<Props> {
  video = React.createRef<HTMLVideoElement>();

  componentDidUpdate(prevProps: Props) {
    const videoNode = this.video.current;

    if (!videoNode) {
      return;
    }

    if (this.props.playing && !prevProps.playing) {
      videoNode.play();
    } else if (!this.props.playing && prevProps.playing) {
      videoNode.pause();
    }

    if (this.props.seeking) {
      videoNode.currentTime = this.props.currentTime;
    }

    videoNode.volume = this.props.volume;
    videoNode.playbackRate = this.props.playbackRate;
  }

  render() {
    const { source, muted } = this.props;

    return (
      <Wrapper>
        <StyledVideo
          innerRef={this.video}
          src={source}
          muted={muted}
          preload="auto"
          playsInline
          onLoadedData={this.handleLoadedData}
          onTimeUpdate={this.handleTimeUpdate}
          onEnded={this.handleEnded}
        />
        <SubtitleEditorContainer />
      </Wrapper>
    );
  }

  handleLoadedData: React.ReactEventHandler<HTMLVideoElement> = event => {
    this.props.onLoadedData(event.currentTarget.duration);
  };

  handleTimeUpdate: React.ReactEventHandler<HTMLVideoElement> = event => {
    this.props.onTimeUpdate(event.currentTarget.currentTime);
  };

  handleEnded = () => {
    this.props.onEnded();
  };
}

export default Video;
