import React, { PureComponent } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { withTheme } from '../../styles/styled-components';
import formatMs from '../../utils/formatMs';
import { ThemeInterface } from '../../styles/theme';
import withSize from '../Timeline/withSize';
import Konva from 'konva';
import { Subtitle } from '../../models/subtitle';
import { unfocus } from '../../utils/ui';

interface Props {
  index: number;
  duration: number;
  startTime: number;
  endTime: number;
  texts: string[];
  selected: boolean;
  theme: ThemeInterface;
  width: number;
  height: number;
  zoomMultiple: number;
  selectSubtitle(indexes: number[]): void;
  updateSubtitle({
    index,
    subtitle,
  }: {
    index: number;
    subtitle: Subtitle;
  }): void;
  seek(nextTime: number): void;
  endSeek(playbackOnSeekEnd: boolean): void;
}

class Block extends PureComponent<Props> {
  render() {
    const {
      index,
      duration,
      startTime,
      endTime,
      texts,
      selected,
      theme,
      width,
      height,
      zoomMultiple,
    } = this.props;

    const length = (endTime - startTime) / 1000;
    const blockX = (startTime / 1000 / duration) * width * zoomMultiple;
    const blockY = (height - 16) * 0.1;
    const blockWidth = (length / duration) * width * zoomMultiple;
    const blockHeight = (height - 16) * 0.4;

    return (
      <Group
        name={`${index}`}
        x={blockX}
        y={blockY}
        width={blockWidth}
        height={blockHeight}
        scaleX={1}
        scaleY={1}
        draggable
        dragBoundFunc={pos => ({ x: pos.x, y: blockY })}
        onDragMove={this.handleDragMove}
        onDragEnd={this.handleDragEnd}
        onMouseDown={this.handleMouseDown}
        onDblClick={this.handleDoubleClick}
      >
        <Rect
          x={0}
          y={0}
          scaleX={1}
          scaleY={1}
          width={blockWidth}
          height={blockHeight}
          fill={
            selected ? theme.pallete.secondary[4] : theme.pallete.secondary[6]
          }
          strokeEnabled={false}
          shadowForStrokeEnabled={false}
        />
        <Group
          x={0}
          y={0}
          width={blockWidth - 12}
          height={blockHeight - 12}
          clipX={0}
          clipY={0}
          clipWidth={blockWidth - 12}
          clipHeight={blockHeight - 12}
        >
          <Text
            text={`${formatMs(startTime)} -> ${formatMs(endTime)}`}
            x={6}
            y={8}
          />
          <Text text={texts.join(' ')} x={6} y={32} />
        </Group>
      </Group>
    );
  }

  handleMouseDown = () => {
    const { selectSubtitle, index } = this.props;
    selectSubtitle([index]);
  };

  handleDoubleClick = () => {
    const { startTime, seek, endSeek } = this.props;

    seek(startTime / 1000);
    endSeek(false);
  };

  handleDragMove: Konva.HandlerFunc = () => {
    unfocus(window);
  };

  handleDragEnd: Konva.HandlerFunc = ({ target }) => {
    const { index, texts, duration, zoomMultiple, updateSubtitle } = this.props;

    const startTime =
      (target.x() / target.getLayer().width() / zoomMultiple) * duration * 1000;
    const endTime =
      ((target.x() + target.width()) /
        target.getLayer().width() /
        zoomMultiple) *
      duration *
      1000;

    updateSubtitle({
      index,
      subtitle: {
        startTime,
        endTime,
        texts,
      },
    });
  };
}

export default withSize(withTheme(Block));
