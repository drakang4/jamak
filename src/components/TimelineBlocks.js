import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Block from './Block';

class TimelineBlocks extends Component {
  render() {
    return (
      <div className="timeline__blocks">
        {this.props.blocks.map((block, index) =>
          <Block
          key={index}
          id={block.id}
          startTime={block.startTime}
          endTime={block.endTime}
          subtitle={block.subtitle}
          isSelected={this.props.selectedBlockId == block.id ? true : false}
          isCurrent={this.props.currentBlockId == block.id ? true : false}/>
        )}
      </div>
    );
  }
}

TimelineBlocks.propTypes = {
  blocks: PropTypes.array.isRequired,
  currentBlockId: PropTypes.number,
  selectedBlockId: PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    blocks: state.blocks.blocks,
    currentBlockId: state.blocks.currentBlockId,
    selectedBlockId: state.blocks.selectedBlockId
  };
};

export default connect(mapStateToProps)(TimelineBlocks);
