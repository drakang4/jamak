import React, { createRef } from 'react';
import Konva from 'konva';
import { Layer, Group, Rect, Line } from 'react-konva';
import { ThemeConsumer } from '../../styles/styled-components';
import { unfocus } from '../../utils/ui';
import SizeContext from './SizeContext';

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

  indicator = createRef<Konva.Group>();

  render() {
    const { currentTime, duration } = this.props;
    const { width, height, zoomMultiple } = this.context;

    const position = width * zoomMultiple * (currentTime / duration) || 0;

    return (
      <ThemeConsumer>
        {theme => (
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
              onMouseUp={this.endSeek}
            >
              <Rect
                x={-5}
                y={0}
                width={9}
                height={16}
                fill={theme.pallete.primary[6]}
              />
              <Line
                points={[0, 0, 0, height]}
                stroke={theme.pallete.primary[6]}
                strokeWidth={1}
              />
            </Group>
          </Layer>
        )}
      </ThemeConsumer>
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

  handleMouseDown: Konva.HandlerFunc<MouseEvent> = ({ evt }) => {
    this.startSeek(evt.layerX);

    const indicator = this.indicator.current;

    if (indicator) {
      indicator.startDrag();
    }
  };

  handleDragStart: Konva.HandlerFunc<MouseEvent> = ({ target }) => {
    const { seeking } = this.props;

    if (!seeking) {
      const { x } = target.getPosition();

      this.startSeek(x);
    }
  };

  handleDragMove: Konva.HandlerFunc<MouseEvent> = ({ target }) => {
    const { duration, seeking, onSeek } = this.props;

    if (seeking) {
      let rate = target.getPosition().x / this.getBarWidth();

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
    this.endSeek();
  };
}

export default ProgressBar;
