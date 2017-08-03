import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BlockTable from '../components/BlockTable';

class BlockTableContainer extends Component {
  static propTypes = {
    blocks: PropTypes.array.isRequired,
  }
  render() {
    const { blocks } = this.props;

    return (
      <BlockTable blocks={blocks} />
    );
  }
}

const mapStateToProps = state => ({
  blocks: state.blocks.blocks,
});

export default connect(mapStateToProps)(BlockTableContainer);
