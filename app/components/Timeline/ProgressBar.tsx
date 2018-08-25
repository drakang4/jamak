import React from 'react';
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
          onMouseDown={this.onMouseDown}
        />
        <Group x={position} y={0} listening={false}>
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

  onMouseDown = ({ evt }: { evt: MouseEvent }) => {
    const { duration, playing, width, zoomMultiple, onSeek } = this.props;
    const barWidth = width * zoomMultiple;

    let rate = evt.layerX / barWidth;
    let cachedX = evt.layerX;

    this.setState({ playbackOnSeekEnd: playing });

    unfocus(window);
    onSeek(rate * duration);

    const onMouseMove = (event: MouseEvent) => {
      const { seeking } = this.props;

      if (seeking) {
        cachedX += event.movementX;
        rate = cachedX / barWidth;

        if (rate < 0) {
          rate = 0;
        } else if (rate > 1) {
          rate = 1;
        }

        unfocus(window);
        onSeek(rate * duration);
      }
    };

    const onMouseUp = (event: MouseEvent) => {
      const { seeking, onEndSeek } = this.props;
      const { playbackOnSeekEnd } = this.state;

      if (seeking) {
        onEndSeek(playbackOnSeekEnd);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
}

export default withSize(withTheme(ProgressBar));
