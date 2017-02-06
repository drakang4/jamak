import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Split from '../components/Split/Split';
import TopPane from './TopPane';
import BottomPane from './BottomPane';

class Editor extends Component {
  render() {
    return (
      <Split type="horizontal">
        <TopPane
          blocks={this.props.blocks} />
        {/*<BottomPane
          blocks={this.props.blocks} />*/}
        <div />
      </Split>
    );
  }
}

Editor.propTypes = {
  blocks: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  blocks: state.blocks.blocks,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
