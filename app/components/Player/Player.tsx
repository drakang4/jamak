import React from 'react';
import { ipcRenderer } from 'electron';
import styled from '../../styles/styled-components';
import Controls from './Controls';
import Video from './Video';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
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
  play(): void;
  pause(): void;
  stop(): void;
  mute(): void;
  unmute(): void;
  setVolume(volume: number): void;
  setSpeed(playbackRate: number): void;
  loaded(duration: number): void;
  timeUpdate(currentTime: number): void;
}

class Player extends React.Component<Props> {
  handlePlayOrPause = () => {
    this.props.playing ? this.props.pause() : this.props.play();
  };

  handleMuteOrUnmute = () => {
    this.props.muted ? this.props.unmute() : this.props.mute();
  };

  handleVolumeUp = () => {
    this.props.setVolume(Math.min(this.props.volume + 0.1, 1));
  };

  handleVolumeDown = () => {
    this.props.setVolume(Math.max(this.props.volume - 0.1, 0));
  };

  handleSpeedUp = () => {
    this.props.setSpeed(this.props.playbackRate + 0.1);
  };

  handleSpeedDown = () => {
    this.props.setSpeed(this.props.playbackRate - 0.1);
  };

  componentDidMount() {
    ipcRenderer.on('play-or-pause', this.handlePlayOrPause);
    ipcRenderer.on('mute-or-unmute', this.handleMuteOrUnmute);
    ipcRenderer.on('volume-up', this.handleVolumeUp);
    ipcRenderer.on('volume-down', this.handleVolumeDown);
    ipcRenderer.on('speed-up', this.handleSpeedUp);
    ipcRenderer.on('speed-down', this.handleSpeedDown);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('play-or-pause', this.handlePlayOrPause);
    ipcRenderer.removeListener('mute-or-unmute', this.handleMuteOrUnmute);
    ipcRenderer.removeListener('volume-up', this.handleVolumeUp);
    ipcRenderer.removeListener('volume-down', this.handleVolumeDown);
    ipcRenderer.removeListener('speed-up', this.handleSpeedUp);
    ipcRenderer.removeListener('speed-down', this.handleSpeedDown);
  }

  render() {
    const {
      source,
      playing,
      muted,
      seeking,
      currentTime,
      duration,
      volume,
      playbackRate,
      play,
      pause,
      stop,
      mute,
      unmute,
      setVolume,
      setSpeed,
      loaded,
      timeUpdate,
    } = this.props;
    return (
      <Wrapper>
        <Video
          source={source}
          playing={playing}
          muted={muted}
          seeking={seeking}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          playbackRate={playbackRate}
          onLoadedData={loaded}
          onTimeUpdate={timeUpdate}
          onEnded={pause}
        />
        <Controls
          playing={playing}
          muted={muted}
          volume={volume}
          onPlay={play}
          onPause={pause}
          onStop={stop}
          onMute={mute}
          onUnmute={unmute}
          onVolumeChange={setVolume}
          onSpeedChange={setSpeed}
        />
      </Wrapper>
    );
  }
}

export default Player;
