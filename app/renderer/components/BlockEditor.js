import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { updateBlockText } from '../constants/actionTypes';

class BlockEditor extends Component {
  handleChange(e) {
    e.preventDefault();
    this.props.onBlockChange(e.target.value);
  }

  render() {
    let className = classNames({
      'block-editor__textarea': true,
      'block-editor__textarea--enable': this.props.currentBlockId!=null
    });

    return (
      <div className="block-editor">
        <textarea
          className={className}
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
    onBlockChange: (block) => dispatch(updateBlockText(block))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockEditor);
