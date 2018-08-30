import React from 'react';
import { Layer } from 'react-konva';
import Konva from 'konva';
import Block from '../Block';
import Transformer from '../Block/Transformer';
import { Subtitle } from '../../models/subtitle';

interface IProps {
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
}

const BlockList: React.SFC<IProps> = ({
  subtitles,
  duration,
  selectedIndex,
  selectSubtitle,
  updateSubtitle,
}) => {
  const handleMouseDown: Konva.HandlerFunc = event => {
    console.log(event.target);
    // clicked on stage - cler selection
    // if (event.target.getLayer().name() === event.target.name()) {
    //   console.log('here');
    //   selectSubtitle([]);
    //   return;
    // }

    // clicked on transformer - do nothing
    const clickedOnTransformer =
      event.target.getParent().getClassName() === 'Transformer';
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const blockIndex = subtitles.findIndex(
      (_, index) => index === selectedIndex[0],
    );

    console.log(blockIndex);
    if (blockIndex !== -1) {
      selectSubtitle([blockIndex]);
    } else {
      selectSubtitle([]);
    }
  };

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
        />
      ))}
      <Transformer
        selectedIndex={selectedIndex[Math.max(selectedIndex.length - 1, 0)]}
      />
    </Layer>
  );
};

export default BlockList;
