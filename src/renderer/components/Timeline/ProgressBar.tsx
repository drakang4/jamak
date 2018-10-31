import React, { createRef } from 'react';
import styled from '../../styles/styled-components';
import { unfocus } from '../../utils/ui';
import SizeContext from './SizeContext';

const StyledBar = styled.div`
  width: 100%;
  height: 16px;
  background-color: ${({ theme }) => theme.pallete.gray[7]};
  will-change: transform;
`;

const Indicator = styled.span<{ lineHeight: number }>`
  z-index: 1;
  display: block;
  position: absolute;
  top: 0px;
  left: -4px;
  width: 9px;
  height: 16px;
  background-color: ${({ theme }) => theme.pallete.primary[6]};
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: ${props => props.lineHeight}px;
    left: 4px;
    border-right: 1px solid ${({ theme }) => theme.pallete.primary[6]};
  }
`;

interface Props {
  currentTime: number;
  duration: number;
  playing: boolean;
  seeking: boolean;
  onSeek(nextTime: number): void;
  onEndSeek(playbackOnSeekEnd: boolean): void;
}

interface State {
  playbackOnSeekEnd: boolean;
}

class ProgressBar extends React.Component<Props, State> {
  state = {
    playbackOnSeekEnd: false,
  };

  static contextType = SizeContext;

  indicator = 'Indicator' || createRef<HTMLSpanElement>();

  render() {
    const { currentTime, duration } = this.props;

    const barWidth = this.getBarWidth();
    const position = barWidth * (currentTime / duration) || 0;

    return (
      <StyledBar onMouseDown={this.handleBarMouseDown}>
        <Indicator
          ref={this.indicator}
          lineHeight={this.context.height}
          style={{ transform: `translateX(${position}px)` }}
        />
      </StyledBar>
    );
  }

  getBarWidth = () => {
    const { width, zoomMultiple } = this.context;

    const barWidth = width * zoomMultiple;

    return barWidth;
  };

  startSeek = (position: number) => {
    const { duration, playing, onSeek } = this.props;

    const rate = position / this.getBarWidth();

    this.setState({ playbackOnSeekEnd: playing });

    onSeek(rate * duration);
  };

  endSeek = () => {
    const { seeking, onEndSeek } = this.props;
    const { playbackOnSeekEnd } = this.state;

    if (seeking) {
      onEndSeek(playbackOnSeekEnd);
    }
  };

  handleBarMouseDown: React.MouseEventHandler<HTMLDivElement> = event => {
    console.log('handleBarMouseDown');

    const {
      left: barLeft,
      width: barWidth,
    } = event.currentTarget.getBoundingClientRect();

    let initialPosition = event.clientX - barLeft;

    this.startSeek(initialPosition);

    const handleBarMouseMove = (closureEvent: MouseEvent) => {
      const { duration, seeking, onSeek } = this.props;

      if (seeking) {
        initialPosition += closureEvent.movementX;

        let rate = initialPosition / barWidth;

        if (rate < 0) {
          rate = 0;
        } else if (rate > 1) {
          rate = 1;
        }

        unfocus(window);
        onSeek(rate * duration);
      }
    };

    const handleBarMouseUp = () => {
      this.endSeek();

      window.removeEventListener('mousemove', handleBarMouseMove);
      window.removeEventListener('mouseup', handleBarMouseUp);
    };

    window.addEventListener('mousemove', handleBarMouseMove);
    window.addEventListener('mouseup', handleBarMouseUp);
  };
}

export default ProgressBar;
