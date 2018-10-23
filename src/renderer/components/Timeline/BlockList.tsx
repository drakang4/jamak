import React, { PureComponent } from 'react';
import { Layer } from 'react-konva';
import Block from '../Block';
import Transformer from '../Block/Transformer';
import { Subtitle } from '../../models/subtitle';

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

class BlockList extends PureComponent<Props> {
  render() {
    const {
      subtitles,
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

    return (
      <Layer>
        {subtitles.map((subtitle, index) => (
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
          />
        ))}
        <Transformer
          selectedIndex={
            [...selectedIndex][Math.max(selectedIndex.size - 1, 0)]
          }
        />
      </Layer>
    );
  }
}

export default BlockList;
