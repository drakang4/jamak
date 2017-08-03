import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBlock, clearBlock, deleteBlock } from '../actions/blocks';

import BlockControls from '../components/BlockControls';

class BlockControlsContainer extends Component {
  static propTypes = {
    onAddBlock: PropTypes.func.isRequired,
    onClearBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    selectedBlockId: PropTypes.number.isRequired,
  };

  render() {
    const {
      onAddBlock,
      onClearBlock,
      onDeleteBlock,
      selectedBlockId,
      currentTime,
      duration,
    } = this.props;

    return (
      <BlockControls
        onAddBlock={onAddBlock}
        onClearBlock={onClearBlock}
        onDeleteBlock={onDeleteBlock}
        selectedBlockId={selectedBlockId}
        currentTime={currentTime}
        duration={duration}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentTime: state.player.currentTime,
  duration: state.player.duration,
  seeking: state.player.seeking,
  currentBlockId: state.blocks.currentBlockId,
  selectedBlockId: state.blocks.selectedBlockId,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    onAddBlock: addBlock,
    onClearBlock: clearBlock,
    onDeleteBlock: deleteBlock,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(BlockControlsContainer);
