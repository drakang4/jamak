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
          placeholder="Edit subtitle of a block"
          value={this.props.selectedBlockId!=null ? this.props.blocks[this.props.selectedBlockId - 1].subtitle : ''}
          onChange={this.handleChange.bind(this)}
          disabled={this.props.selectedBlockId==null}
          autoFocus></textarea>
      </div>
    );
  }
}

BlockEditor.propTypes = {
  onBlockChange: PropTypes.func.isRequired,
  blocks: PropTypes.array.isRequired,
  selectedBlockId: PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    blocks: state.blocks.blocks,
    selectedBlockId: state.blocks.selectedBlockId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBlockChange: (block) => dispatch(Actions.updateBlockText(block))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockEditor);
