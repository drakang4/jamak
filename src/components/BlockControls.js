import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Actions from '../actions';

class BlockControls extends Component {
  handleAddClick(e) {
    e.preventDefault();
    let startTime, endTime;

    /**
     * 현재 위치보다 앞에 있는 블록과 뒤에 있는 블록의 아이디를 구함
     * 없으면 null?
     */


    /**
     * 1. 맨 처음 또는 아무것도 없을 때 추가
     * 3. 어떤 블록 위에서 추가
     * 2. 블록 사이 간격에서 추가
     * 4. 맨 마지막 블록 뒤에서 추가
     */

    startTime = this.props.currentTime;
    endTime = this.props.currentTime + 3;

    if(!this.props.currentBlockId) {
      if(this.props.blocks.length == 0) {
        endTime = endTime < this.props.duration ? endTime : this.props.duration;
        this.props.onAddBlockFirst(startTime, endTime);
      } else if(this.props.blocks[0].startTime > this.props.currentTime) {
        endTime = endTime < this.props.blocks[0].startTime ? endTime : this.props.blocks[0].startTime;
        this.props.onAddBlockFirst(startTime, endTime);
      } else if(this.props.blocks[this.props.blocks.length - 1].endTime < this.props.currentTime) {
        endTime = endTime < this.props.duration ? endTime : this.props.duration;
        this.props.onAddBlockLast(startTime, endTime);
      } else {
        for(var i = 0; i < this.props.blocks.length - 1; i++) {
          if(this.props.blocks[i].endTime < this.props.currentTime && this.props.blocks[i + 1].startTime > this.props.currentTime) {
            endTime = endTime < this.props.blocks[i + 1].startTime ? endTime : this.props.blocks[i + 1].startTime;
            this.props.onAddBlockBetween(startTime, endTime, i + 2);
            break;
          }
        }
      }
    } else {
      if(this.props.blocks.length == this.props.currentBlockId) {
        endTime = endTime < this.props.duration ? endTime : this.props.duration;
      } else {
        endTime = endTime < this.props.blocks[this.props.currentBlockId].startTime ? endTime : this.props.blocks[this.props.currentBlockId].startTime;
      }
      this.props.onAddBlockOver(startTime, endTime);
    }
    this.props.onResetBlockId();
  }

  handleClearClick(e) {
    e.preventDefault();
    this.props.onClearBlock(this.props.selectedBlockId);
  }

  handleDeleteClick(e) {
    e.preventDefault();
    this.props.onDeleteBlock(this.props.selectedBlockId);
    this.props.onResetBlockId();

    // 삭제 후 현재 블록의 ID를 다시 구해야 함.
    let currentBlock = this.props.blocks.find((block) => block.startTime <= this.props.currentTime && block.endTime >= this.props.currentTime);

    if(currentBlock) {
      this.props.onCurrentBlock(currentBlock.id);
    } else {
      this.props.onCurrentBlock(null);
    }
  }

  render() {
    return (
      <div className="block-controls">
        <button
          className="block-controls__button block-controls__button--add"
          onClick={this.handleAddClick.bind(this)}
          disabled={this.props.url === null}></button>
        <button
          className="block-controls__button block-controls__button--delete"
          onClick={this.handleDeleteClick.bind(this)}
          disabled={this.props.url === null || this.props.selectedBlockId === null}></button>
        <button
        className="block-controls__button block-controls__button--clear"
        onClick={this.handleClearClick.bind(this)}
        disabled={this.props.url === null || this.props.selectedBlockId === null}></button>
      </div>
    );
  }
}

BlockControls.propTypes = {
  onAddBlockFirst: PropTypes.func.isRequired,
  onAddBlockLast: PropTypes.func.isRequired,
  onAddBlockOver: PropTypes.func.isRequired,
  onAddBlockBetween: PropTypes.func.isRequired,
  onClearBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  onResetBlockId: PropTypes.func.isRequired,
  onCurrentBlock: PropTypes.func.isRequired,

  blocks: PropTypes.array.isRequired,
  currentBlockId: PropTypes.number,
  selectedBlockId: PropTypes.number,
  url: PropTypes.string,
  currentTime: PropTypes.number,
  duration: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    blocks: state.blocks.blocks,
    currentBlockId: state.blocks.currentBlockId,
    selectedBlockId: state.blocks.selectedBlockId,
    url: state.player.url,
    currentTime: state.player.currentTime,
    duration: state.player.duration
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddBlockFirst: (startTime, endTime) => dispatch(Actions.addBlockFirst(startTime, endTime)),
    onAddBlockLast: (startTime, endTime) => dispatch(Actions.addBlockLast(startTime, endTime)),
    onAddBlockOver: (startTime, endTime) => dispatch(Actions.addBlockOver(startTime, endTime)),
    onAddBlockBetween: (startTime, endTime, nextBlockId) => dispatch(Actions.addBlockBetween(startTime, endTime, nextBlockId)),
    onClearBlock: (block) => dispatch(Actions.clearBlock(block)),
    onDeleteBlock: (block) => dispatch(Actions.deleteBlock(block)),
    onResetBlockId: () => dispatch(Actions.resetBlockId()),
    onCurrentBlock: (id) => dispatch(Actions.currentBlock(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockControls);
