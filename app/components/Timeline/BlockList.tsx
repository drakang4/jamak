import React, { PureComponent } from 'react';
import { Layer } from 'react-konva';
import Konva from 'konva';
import Block from '../Block';
import Transformer from '../Block/Transformer';
import { Subtitle } from '../../models/subtitle';

interface Props {
  subtitles: Subtitle[];
  selectedIndex: number[];
  duration: number;
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

class BlockList extends PureComponent<Props> {
  render() {
    const {
      subtitles,
      duration,
      selectedIndex,
      selectSubtitle,
      updateSubtitle,
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
            selected={selectedIndex.includes(index)}
            selectSubtitle={selectSubtitle}
            updateSubtitle={updateSubtitle}
            seek={seek}
            endSeek={endSeek}
          />
        ))}
        <Transformer
          selectedIndex={selectedIndex[Math.max(selectedIndex.length - 1, 0)]}
        />
      </Layer>
    );
  }
}

export default BlockList;
