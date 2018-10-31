import React, { Component } from 'react';
import { remote } from 'electron';
import Block from '../Block/Block';
import Transformer from '../Block/Transformer';
import { Subtitle } from '../../models/subtitle';
import styled from '../../styles/styled-components';
import SizeContext from './SizeContext';
import { getTimeRange } from '../../utils/time';
import { ISubtitle } from 'subtitle-utils';
import Draggable from '../Block/Draggable';

const { Menu } = remote;

const VirtualView = styled.div`
  top: 5%;
  height: 40%;
  position: relative;
  will-change: transform;
`;

interface Props {
  subtitles: Subtitle[];
  selectedIndex: Set<number>;
  duration: number;
  setSelection(selectedIndex: Set<number>): void;
  appendSelection(selectedIndex: Set<number>): void;
  popSelection(selectedIndex: Set<number>): void;
  updateSubtitle(param: { index: number; subtitle: Subtitle }): void;
  deleteSubtitle(indexes: Set<number>): void;
  seek(nextTime: number): void;
  endSeek(playbackOnSeekEnd: boolean): void;
}

class BlockList extends Component<Props> {
  static contextType = SizeContext;

  filterByTimeRange = () => {
    const { scrollLeft, width, zoomMultiple } = this.context;

    const start = scrollLeft;
    const end = scrollLeft + width;
    const full = width * zoomMultiple;
    const { duration } = this.props;

    const { startTime, endTime } = getTimeRange(start, end, full, duration);

    const filteredSubtitles = this.props.subtitles.filter(
      subtitle =>
        subtitle.startTime >= startTime && subtitle.endTime <= endTime,
    );

    return filteredSubtitles;
  };

  renderVisibleBlocks = () => {
    const { subtitles } = this.props;

    const { scrollLeft, width, zoomMultiple } = this.context;

    const start = scrollLeft;
    const end = scrollLeft + width;
    const full = width * zoomMultiple;
    const {
      duration,
      selectedIndex,
      setSelection,
      appendSelection,
      popSelection,
      updateSubtitle,
      deleteSubtitle,
      seek,
      endSeek,
    } = this.props;

    const { startTime, endTime } = getTimeRange(start, end, full, duration);

    const visibleBlocks = new Map<number, ISubtitle>();

    subtitles.forEach((subtitle, index) => {
      const visible =
        subtitle.startTime >= startTime && subtitle.endTime <= endTime;
      // (subtitle.startTime < startTime && subtitle.endTime > startTime) ||
      // (subtitle.startTime < endTime && subtitle.endTime < endTime);

      if (visible) {
        visibleBlocks.set(index, subtitle);
      }
    });

    const renderingBlocks = [];

    for (const block of visibleBlocks) {
      const [index, subtitle] = block;

      renderingBlocks.push(
        <Block
          key={index}
          index={index}
          duration={duration}
          startTime={subtitle.startTime}
          endTime={subtitle.endTime}
          texts={subtitle.texts}
          selected={selectedIndex.has(index)}
          setSelection={setSelection}
          appendSelection={appendSelection}
          popSelection={popSelection}
          updateSubtitle={updateSubtitle}
          deleteSubtitle={deleteSubtitle}
          seek={seek}
          endSeek={endSeek}
        />,
      );
    }

    return renderingBlocks;
  };

  handleDragStart = () => {};

  handleDragMove = () => {};

  handleDragEnd = (index: number) => (x: number, y: number) => {
    const { subtitles, duration, updateSubtitle } = this.props;

    const { width, zoomMultiple } = this.context;

    const diffTime = (x / (width * zoomMultiple)) * duration * 1000;

    const startTime = subtitles[index].startTime + diffTime;
    const endTime = subtitles[index].endTime + diffTime;

    updateSubtitle({
      index,
      subtitle: {
        startTime,
        endTime,
        texts: subtitles[index].texts,
      },
    });
  };

  handleSelect = (index: number, selected: boolean) => (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const { setSelection, appendSelection, popSelection } = this.props;

    const newSelction = new Set([index]);

    if (event.ctrlKey) {
      selected ? popSelection(newSelction) : appendSelection(newSelction);
    } else {
      selected ? appendSelection(newSelction) : setSelection(newSelction);
    }
  };

  handleContextMenu = (index: number) => (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const { deleteSubtitle } = this.props;

    const menu = Menu.buildFromTemplate([
      {
        label: 'Delete',
        click: () => {
          deleteSubtitle(new Set([index]));
        },
      },
    ]);

    menu.popup({ window: remote.getCurrentWindow() });
  };

  handleDoubleClick = (startTime: number) => (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const { seek, endSeek } = this.props;

    seek(startTime / 1000);
    endSeek(false);
  };

  render() {
    const { subtitles, duration, selectedIndex } = this.props;

    return (
      <VirtualView>
        {subtitles.map((subtitle, index) => {
          const selected = selectedIndex.has(index);

          return (
            <Draggable
              key={index}
              direction="horizontal"
              onDragStart={this.handleDragStart}
              onDragMove={this.handleDragMove}
              onDragEnd={this.handleDragEnd(index)}
            >
              <Block
                index={index}
                duration={duration}
                startTime={subtitle.startTime}
                endTime={subtitle.endTime}
                texts={subtitle.texts}
                selected={selected}
                onSelect={this.handleSelect(index, selected)}
                onContextMenu={this.handleContextMenu(index)}
                onDoubleClick={this.handleDoubleClick(subtitle.startTime)}
              />
            </Draggable>
          );
        })}
        {/* {this.renderVisibleBlocks()} */}
        {/* <Transformer
            selectedIndex={
              [...selectedIndex][Math.max(selectedIndex.size - 1, 0)]
            }
          /> */}
      </VirtualView>
    );
  }
}

export default BlockList;
