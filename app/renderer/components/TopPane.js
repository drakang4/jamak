import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tutorial from './Tutorial';
import Player from './Player';
import Resizer from './Resizer';

import BlockTable from './BlockTable';

class TopPane extends Component {
  render() {
    let style = {
      height: this.props.top
    };

    return (
      <div className="top-pane" style={style}>
        <Player />
        <Resizer type="horizontal"/>
        <BlockTable />
      </div>
    );
  }
}

TopPane.propTypes = {
  top: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    top: state.resizer.top
  };
};

export default connect(mapStateToProps)(TopPane);
