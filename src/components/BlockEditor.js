import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Actions from '../actions';

class BlockEditor extends Component {
  handleChange(e) {
    e.preventDefault();
    this.props.onBlockChange(e.target.value);
  }

  render() {
    return (
      <div className="block-editor">
        <textarea
          className="block-editor__textarea"
          type="text"
          name="editor"
          value={this.props.currentBlockId!=null ? this.props.blocks[this.props.currentBlockId - 1].subtitle : ''}
          onChange={this.handleChange.bind(this)}
          disabled={this.props.currentBlockId==null}
          autoFocus></textarea>
      </div>
    );
  }
}

BlockEditor.propTypes = {
  onBlockChange: PropTypes.func.isRequired,
  blocks: PropTypes.array.isRequired,
  currentBlockId: PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    blocks: state.blocks.blocks,
    currentBlockId: state.blocks.currentBlockId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBlockChange: (block) => dispatch(Actions.updateBlockText(block))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockEditor);
