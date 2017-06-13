import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as blockActions from '../actions/blocks';
import { startSeek, doingSeek, endSeek } from '../actions/player';
import BlockControls from '../components/BlockControls';
import Timeline from '../components/Timeline';
import Split from '../components/Split';

class BottomPane extends Component {
  render() {
    return (
      <Split type="vertical" defaultSize={48} disableResize>
        <BlockControls
          addBlock={this.props.addBlock}
          clearBlock={this.props.clearBlock}
          deleteBlock={this.props.deleteBlock}
          selectedBlockId={this.props.selectedBlockId}
          currentTime={this.props.currentTime}
          duration={this.props.duration}
        />
        <Timeline
          blocks={this.props.blocks}
          currentTime={this.props.currentTime}
          duration={this.props.duration}
          seeking={this.props.seeking}
          currentBlockId={this.props.currentBlockId}
          selectedBlockId={this.props.selectedBlockId}
          selectBlock={this.props.selectBlock}
          startSeek={this.props.startSeek}
          doingSeek={this.props.doingSeek}
          endSeek={this.props.endSeek}
        />
      </Split>
    );
  }
}

BottomPane.propTypes = {
  blocks: PropTypes.array.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  seeking: PropTypes.bool.isRequired,
  currentBlockId: PropTypes.number.isRequired,
  selectedBlockId: PropTypes.number.isRequired,

  currentBlock: PropTypes.func.isRequired,
  selectBlock: PropTypes.func.isRequired,
  addBlock: PropTypes.func.isRequired,
  clearBlock: PropTypes.func.isRequired,
  deleteBlock: PropTypes.func.isRequired,
  startSeek: PropTypes.func.isRequired,
  doingSeek: PropTypes.func.isRequired,
  endSeek: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentTime: state.player.currentTime,
  duration: state.player.duration,
  seeking: state.player.seeking,
  currentBlockId: state.blocks.currentBlockId,
  selectedBlockId: state.blocks.selectedBlockId,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(Object.assign({}, blockActions, { startSeek, doingSeek, endSeek }), dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(BottomPane);
