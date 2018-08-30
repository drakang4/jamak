import React, { createRef } from 'react';
import Konva from 'konva';
import { Layer, Group, Rect, Line } from 'react-konva';
import { withTheme } from '../../styles/styled-components';
import { ThemeInterface } from '../../styles/theme';
import withSize from './withSize';
import { unfocus } from '../../utils/ui';

interface Props {
  currentTime: number;
  duration: number;
  playing: boolean;
  seeking: boolean;
  theme: ThemeInterface;
  width: number;
  height: number;
  zoomMultiple: number;
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

  indicator = createRef<Konva.Group>();

  render() {
    const {
      currentTime,
      duration,
      theme,
      width,
      height,
      zoomMultiple,
    } = this.props;

    const position = width * zoomMultiple * (currentTime / duration) || 0;

    return (
      <Layer>
        <Rect
          x={0}
          y={0}
          width={width * zoomMultiple}
          height={16}
          fill={theme.pallete.gray[7]}
          onMouseDown={this.handleMouseDown}
        />
        <Group
          ref={this.indicator}
          x={position}
          y={0}
          draggable
          dragBoundFunc={pos => ({ x: pos.x, y: 0 })}
          onDragStart={this.handleDragStart}
          onDragMove={this.handleDragMove}
          onDragEnd={this.handleDragEnd}
        >
          <Rect
            x={-4}
            y={0}
            width={9}
            height={16}
            fill={theme.pallete.primary[6]}
          />
          <Line
            points={[0, 0, 0, height]}
            stroke={theme.pallete.primary[6]}
            strokeWidth={2}
          />
        </Group>
      </Layer>
    );
  }

  handleMouseDown: Konva.HandlerFunc<MouseEvent> = ({ evt }) => {
    const indicator = this.indicator.current;

    if (indicator) {
      const { duration, width, zoomMultiple, onSeek } = this.props;

      const barWidth = width * zoomMultiple;

      const rate = evt.layerX / barWidth;

      onSeek(rate * duration);

      indicator.startDrag();
    }
  };

  handleDragStart: Konva.HandlerFunc<MouseEvent> = ({ target }) => {
    const { duration, playing, width, zoomMultiple, onSeek } = this.props;

    const barWidth = width * zoomMultiple;

    const rate = target.getPosition().x / barWidth;

    this.setState({ playbackOnSeekEnd: playing });

    onSeek(rate * duration);
  };

  handleDragMove: Konva.HandlerFunc<MouseEvent> = ({ target }) => {
    const { duration, seeking, width, zoomMultiple, onSeek } = this.props;

    const barWidth = width * zoomMultiple;

    if (seeking) {
      let rate = target.getPosition().x / barWidth;

      if (rate < 0) {
        rate = 0;
      } else if (rate > 1) {
        rate = 1;
      }

      unfocus(window);
      onSeek(rate * duration);
    }
  };

  handleDragEnd: Konva.HandlerFunc<MouseEvent> = () => {
    const { seeking, onEndSeek } = this.props;
    const { playbackOnSeekEnd } = this.state;

    if (seeking) {
      onEndSeek(playbackOnSeekEnd);
    }
  };
}

export default withSize(withTheme(ProgressBar));
