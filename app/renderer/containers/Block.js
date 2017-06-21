import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BlockComponent from '../components/Block';
import * as blockActions from '../actions/blocks';
import { startSeek, endSeek } from '../actions/player';

class Block extends Component {
  state = {
    hover: false,
  };

  handleHover = () => {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    return (
      <BlockComponent
        currentTime={this.props.currentTime}
        duration={this.props.duration}
        id={this.props.id}
        startTime={this.props.startTime}
        endTime={this.props.endTime}
        subtitle={this.props.subtitle}
        current={this.props.current}
        selected={this.props.selected}
        hover={this.state.hover}
        onCurrent={this.props.currentBlock}
        onSelect={this.props.selectBlock}
        onDelete={this.props.deleteBlock}
        startSeek={this.props.startSeek}
        endSeek={this.props.endSeek}
        updateTime={this.props.updateBlockTime}
        handleHover={this.handleHover}
      />
    );
  }
}

Block.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  subtitle: PropTypes.string.isRequired,
  current: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  currentBlock: PropTypes.func.isRequired,
  selectBlock: PropTypes.func.isRequired,
  deleteBlock: PropTypes.func.isRequired,
  startSeek: PropTypes.func.isRequired,
  endSeek: PropTypes.func.isRequired,
  updateBlockTime: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...blockActions,
  startSeek,
  endSeek,
}, dispatch);

export default connect(null, mapDispatchToProps)(Block);
