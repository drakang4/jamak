import React, { PureComponent, createRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { remote } from 'electron';
import { withTheme } from '../../styles/styled-components';
import formatMs from '../../utils/formatMs';
import { ThemeInterface } from '../../styles/theme';
import withSize from '../Timeline/withSize';
import Konva from 'konva';
import { Subtitle } from '../../models/subtitle';
import { unfocus } from '../../utils/ui';

const { Menu } = remote;

type TransformHandlerFunc<E = Event> = ((
  e: { transformer: Konva.Shape },
) => void);

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
  setSelection(selectedIndex: Set<number>): void;
  appendSelection(selectedIndex: Set<number>): void;
  popSelection(selectedIndex: Set<number>): void;
  updateSubtitle({
    index,
    subtitle,
  }: {
    index: number;
    subtitle: Subtitle;
  }): void;
  deleteSubtitle(index: number): void;
  seek(nextTime: number): void;
  endSeek(playbackOnSeekEnd: boolean): void;
}

class Block extends PureComponent<Props> {
  block = createRef<Konva.Group>();

  cacheBlock = () => {
    const block = this.block.current;

    if (!block) {
      return;
    }

    block.cache();
  };

  calculateTimes = (block: Konva.Shape) => {
    const { duration, zoomMultiple } = this.props;

    const startTime =
      (block.x() / block.getLayer().width() / zoomMultiple) * duration * 1000;
    const endTime =
      ((block.x() + block.width()) / block.getLayer().width() / zoomMultiple) *
      duration *
      1000;

    return {
      startTime,
      endTime,
    };
  };

  handleMouseDown: Konva.HandlerFunc<MouseEvent> = ({ evt }) => {
    const {
      setSelection,
      appendSelection,
      popSelection,
      selected,
      index,
    } = this.props;

    const newSelction = new Set([index]);

    if (evt.ctrlKey) {
      selected ? popSelection(newSelction) : appendSelection(newSelction);
    } else {
      selected ? appendSelection(newSelction) : setSelection(newSelction);
    }

    // Fire drag event to all selcted blocks except for this one.
    // TODO: More optimization

    const layer = this.block.current!.getLayer();
    const selectedBlocks = layer.find('.selected');

    selectedBlocks.each(block => {
      if (!block.isDragging) {
        block.startDrag();
      }
    });
  };

  handleDoubleClick: Konva.HandlerFunc<MouseEvent> = () => {
    const { startTime, seek, endSeek } = this.props;

    seek(startTime / 1000);
    endSeek(false);
  };

  handleContextMenu: Konva.HandlerFunc<MouseEvent> = ({ evt }) => {
    evt.preventDefault();

    const { deleteSubtitle, index } = this.props;

    const menu = Menu.buildFromTemplate([
      {
        label: 'Delete',
        click: () => {
          deleteSubtitle(index);
        },
      },
    ]);

    menu.popup({ window: remote.getCurrentWindow() });
  };

  handleDragMove: Konva.HandlerFunc<MouseEvent> = ({ target }) => {
    const { zoomMultiple } = this.props;

    unfocus(window);

    const layer = this.block.current!.getLayer();
    const transformer = layer.findOne('.transformer');

    console.log(target);
    // Bound block in timeline and between previous and next blocks.
    if (target.getPosition().x < 0) {
      target.x(0);
    } else if (
      target.getPosition().x + target.getWidth() >
      layer.getWidth() * zoomMultiple
    ) {
      target.x(layer.getWidth() * zoomMultiple - target.getWidth());
    }

    transformer.position(target.getPosition());
  };

  handleDragEnd: Konva.HandlerFunc<MouseEvent> = ({ target }) => {
    const { index, texts, updateSubtitle } = this.props;

    const { startTime, endTime } = this.calculateTimes(target);

    updateSubtitle({
      index,
      subtitle: {
        startTime,
        endTime,
        texts,
      },
    });
  };

  handleTransform: Konva.HandlerFunc<MouseEvent> = () => {
    unfocus(window);
  };

  handleTransformEnd: TransformHandlerFunc = ({ transformer }) => {
    const { index, texts, updateSubtitle } = this.props;

    const { startTime, endTime } = this.calculateTimes(transformer);

    updateSubtitle({
      index,
      subtitle: {
        startTime,
        endTime,
        texts,
      },
    });
  };

  componentDidMount() {
    this.cacheBlock();
  }

  componentDidUpdate() {
    this.cacheBlock();
  }

  componentWillUnmount() {
    const block = this.block.current;

    if (!block) {
      return;
    }

    block.clearCache();
  }

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
        ref={this.block}
        name={`${index} ${selected ? 'selected' : ''}`}
        x={blockX}
        y={blockY}
        width={blockWidth}
        height={blockHeight}
        draggable
        dragBoundFunc={pos => ({ x: pos.x, y: blockY })}
        onDragMove={this.handleDragMove}
        onDragEnd={this.handleDragEnd}
        onTransform={this.handleTransform}
        onTransformEnd={this.handleTransformEnd}
        onMouseDown={this.handleMouseDown}
        onDblClick={this.handleDoubleClick}
        onContextMenu={this.handleContextMenu}
      >
        <Rect
          x={0}
          y={0}
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
}

export default withSize(withTheme(Block));
