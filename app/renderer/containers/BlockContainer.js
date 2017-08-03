import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Block from '../components/Block';
import { selectBlock, updateBlockTime } from '../actions/blocks';

class BlockContainer extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    onUpdateTime: PropTypes.func.isRequired,
  };

  state = {
    hover: false,
  };

  handleHover = () => {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    const {
      onSelect,
      onUpdateTime,
      ...props
    } = this.props;

    return (
      <Block
        hover={this.state.hover}
        onHover={this.handleHover}
        onSelect={onSelect}
        onUpdateTime={onUpdateTime}
        {...props}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  onSelect: selectBlock,
  onUpdateTime: updateBlockTime,
}, dispatch);

export default connect(null, mapDispatchToProps)(BlockContainer);
