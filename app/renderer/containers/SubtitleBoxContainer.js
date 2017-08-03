import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateBlockText } from '../actions/blocks';

import SubtitleBox from '../components/SubtitleBox';

class SubtitleBoxContainer extends Component {
  static propTypes = {
    blocks: PropTypes.array.isRequired,
    currentBlockId: PropTypes.number.isRequired,
    updateBlockText: PropTypes.func.isRequired,
  };

  render() {
    return (
      <SubtitleBox
        blocks={this.props.blocks}
        currentBlockId={this.props.currentBlockId}
        updateBlockText={this.props.updateBlockText}
      />
    );
  }
}

const mapStateToProps = state => ({
  blocks: state.blocks.blocks,
  currentBlockId: state.blocks.currentBlockId,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateBlockText,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SubtitleBoxContainer);
