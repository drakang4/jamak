import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BlockControls from './BlockControls';
import ProgressBar from './ProgressBar';
import Timeline from './Timeline';

class BottomPane extends Component {
  render() {
    let style = {
      height: 'calc(100% - ' + this.props.top + 'px)'
    };

    return (
      <div className="bottom-pane" style={style}>
        <ProgressBar />
        <BlockControls />
        <Timeline />
      </div>
    );
  }
}

BottomPane.propTypes = {
  top: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    top: state.resizer.top
  };
};

export default connect(mapStateToProps)(BottomPane);
