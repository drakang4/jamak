import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import Actions from '../actions';
import ProgressBar from './ProgressBar';
import TimelineBlocks from './TimelineBlocks';
import { fromSrt, toSrt } from '../utils/srtParser';

class Timeline extends Component {
  componentDidMount() {
    ipcRenderer.on('file-new', (event) => {
      this.props.newBlockFile();
    });
    ipcRenderer.on('file-open', (event, data, filename) => {
      this.props.loadBlockFile(fromSrt(data));
      this.props.savedBlockFile(filename);
    });
    ipcRenderer.on('file-state-req', (event) => {
      if(this.props.blockFileSaved) {
        event.sender.send('file-state-res', 'saved', this.props.blockFilePath);
      } else {
        event.sender.send('file-state-res', 'unsaved');
      }
    });
    ipcRenderer.on('file-save-req', (event, filename) => {
      event.sender.send('file-save-res', toSrt(this.props.blocks));
      this.props.savedBlockFile(filename);
    });
  }

  render() {
    return (
      <div className="timeline">
        <div onMouseDown={() => this.props.selectBlock(null)} className="timeline__wrapper" style={{width: '100%'}}>
          <ProgressBar />
          <div className="timeline__contents">
            <TimelineBlocks />
          </div>
        </div>
      </div>
    );
  }
}

Timeline.propTypes = {
  newBlockFile: PropTypes.func.isRequired,
  loadBlockFile: PropTypes.func.isRequired,
  savedBlockFile: PropTypes.func.isRequired,
  unsavedBlockFile: PropTypes.func.isRequired,
  selectBlock: PropTypes.func.isRequired,
  blocks: PropTypes.array.isRequired,
  blockFilePath: PropTypes.string.isRequired,
  blockFileSaved: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    blocks: state.blocks.blocks,
    blockFilePath: state.blocks.blockFilePath,
    blockFileSaved: state.blocks.blockFileSaved
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newBlockFile: () => dispatch(Actions.newBlockFile()),
    loadBlockFile: (blocks) => dispatch(Actions.loadBlockFile(blocks)),
    savedBlockFile: (path) => dispatch(Actions.savedBlockFile(path)),
    unsavedBlockFile: () => dispatch(Actions.unsavedBlockFile()),
    selectBlock: (id) => dispatch(Actions.selectBlock(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
