import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Actions from '../actions';

class BlockControls extends Component {
  handleAddClick(e) {
    e.preventDefault();
    let id, startTime, endTime;

    /**
     * 현재 위치보다 앞에 있는 블록과 뒤에 있는 블록의 아이디를 구함
     * 없으면 null?
     */
    let currentBlock = this.props.blocks.find((block) => block.startTime <= e.target.currentTime && block.endTime >= e.target.currentTime);

    if(currentBlock) {
      this.props.selectBlock(currentBlock.id);
    } else {
      this.props.cancelBlock();
    }


    /**
     * 블록을 만들 때 기본 길이는 3초
     * 타임라인 끝을 초과하는 것을 방지
     */
    startTime = this.props.currentTime > 0 ? this.props.currentTime : 0;
    endTime = this.props.currentTime + 3 > this.props.duration ? this.props.duration : this.props.currentTime + 3;
    this.props.onAddBlock(startTime, endTime);
  }

  handleClearClick(e) {
    e.preventDefault();
    this.props.onClearBlock(this.props.selectedBlockId);
  }

  handleDeleteClick(e) {
    e.preventDefault();
    this.props.onDeleteBlock(this.props.selectedBlockId);
  }

  render() {
    return (
      <div className="block-controls">
        <button
          className="block-controls__button block-controls__button--add"
          onClick={this.handleAddClick.bind(this)}
          disabled={this.props.url==''}></button>
        <button
          className="block-controls__button block-controls__button--delete"
          onClick={this.handleDeleteClick.bind(this)}
          disabled={this.props.url=='' || this.props.selectedBlockId==null}></button>
        <button
        className="block-controls__button block-controls__button--clear"
        onClick={this.handleClearClick.bind(this)}
        disabled={this.props.url=='' || this.props.selectedBlockId==null}></button>
      </div>
    );
  }
}

BlockControls.propTypes = {
  onAddBlock: PropTypes.func.isRequired,
  onClearBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  selectedBlockId: PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    url: state.player.url,
    selectedBlockId: state.blocks.selectedBlockId,
    currentTime: state.player.currentTime,
    duration: state.player.duration
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddBlock: (startTime, endTime) => dispatch(Actions.addBlock(startTime, endTime)),
    onClearBlock: (block) => dispatch(Actions.clearBlock(block)),
    onDeleteBlock: (block) => dispatch(Actions.deleteBlock(block))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockControls);
