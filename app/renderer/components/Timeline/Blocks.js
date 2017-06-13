import PropTypes from 'prop-types';
import React from 'react';

import Block from '../../containers/Block';

import styles from './styles.css';

const Blocks = (props) => {
  const {
    blocks,
    currentTime,
    duration,
    currentBlockId,
    selectedBlockId,
  } = props;
  return (
    <div className={styles.line}>
      {blocks.map((block, index) => (
        <Block
          key={index}
          id={block.id}
          currentTime={currentTime}
          duration={duration}
          startTime={block.startTime}
          endTime={block.endTime}
          subtitle={block.subtitle}
          current={currentBlockId === block.id}
          selected={selectedBlockId === block.id}
        />
      ))}
    </div>
  );
};

Blocks.propTypes = {
  blocks: PropTypes.array.isRequired,
  duration: PropTypes.number.isRequired,
  currentBlockId: PropTypes.number.isRequired,
  selectedBlockId: PropTypes.number.isRequired,
};

export default Blocks;
