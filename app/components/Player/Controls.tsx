import React from 'react';
import styled from '../../styles/styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.pallete.gray[8]};
`;

const Button = styled.button`
  background: transparent;
  border: none;
  width: 24px;
  height: 24px;
  margin: 8px;
  padding: 0;
  fill: ${props => props.theme.pallete.primary[6]};

  &:focus {
    outline: 0;
  }
`;

const Volume = styled.input`
  -webkit-appearance: none;
  background-color: ${props => props.theme.pallete.gray[0]};

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 4px;
    color: ${props => props.theme.pallete.primary[4]};
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background-color: ${props => props.theme.pallete.primary[6]};
    border: 0;
    box-shadow: none;
    border-radius: 8px;
    margin-top: -6px;
  }
`;

interface IProps {
  playing: boolean;
  muted: boolean;
  volume: number;
  onPlay(): void;
  onPause(): void;
  onStop(): void;
  onMute(): void;
  onUnmute(): void;
  onVolumeChange(volume: number): void;
  onSpeedChange(volume: number): void;
}

const Controls: React.SFC<IProps> = ({
  playing,
  muted,
  volume,
  onPlay,
  onPause,
  onMute,
  onUnmute,
  onVolumeChange,
  onSpeedChange,
}) => {
  const handleVolumeChange: React.FormEventHandler<
    HTMLInputElement
  > = event => {
    onVolumeChange(parseFloat(event.currentTarget.value));
  };

  return (
    <Wrapper>
      <Button onClick={playing ? onPause : onPlay}>
        <svg viewBox="0 0 48 48">
          {playing ? (
            <path d="M12,38h8V10h-8V38z M28,10v28h8V10H28z" />
          ) : (
            <path d="M16,10v28l22-14L16,10z" />
          )}
        </svg>
      </Button>
      <Button onClick={muted ? onUnmute : onMute}>
        <svg viewBox="0 0 48 48">
          {muted || volume === 0 ? (
            <path d="M14,18v12h8l10,10V8L22,18H14z" />
          ) : (
            <path d="M6,18v12h8l10,10V8L14,18H6z M33,24c0-3.5-2-6.6-5-8.1V32C31,30.6,33,27.5,33,24z M28,6.5v4.1c5.8,1.7,10,7.1,10,13.4s-4.2,11.7-10,13.4v4.1c8-1.8,14-9,14-17.5S36,8.3,28,6.5z" />
          )}
        </svg>
      </Button>
      <Volume
        type="range"
        step={0.01}
        min={0}
        max={1}
        value={muted ? 0 : volume}
        onChange={handleVolumeChange}
      />
    </Wrapper>
  );
};

export default Controls;
