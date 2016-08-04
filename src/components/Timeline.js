import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import Actions from '../actions';
import ProgressBar from './ProgressBar';
import TimelineBlocks from './TimelineBlocks';
import { fromSrt, toSrt } from '../utils/srtParser';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scalable: false
    };
  }

  handleKeydown(e) {
    if(!this.state.scalable) {
      this.setState({ scalable: true });
    }
  }

  handleKeyup(e) {
    if(this.state.scalable) {
      this.setState({ scalable: false });
    }
  }

  handleWheel(e) {
    e.preventDefault();
    if(this.state.scalable) {
      e.deltaY > 0 ? this.props.setMultiple(this.props.multiple - 50) : this.props.setMultiple(this.props.multiple + 50);
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
    document.addEventListener('keyup', (e) => this.handleKeyup(e));
    this.refs.timeline.addEventListener('wheel', (e) => this.handleWheel(e));

    ipcRenderer.on('file-new', (event) => {
      this.props.newBlockFile();
      this.props.unsavedBlockFile();
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

  componentWillUnmount() {
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
    document.addEventListener('keyup', (e) => this.handleKeyup(e));
    this.refs.timeline.removeEventListener('wheel', (e) => this.handleWheel(e));
  }

  render() {
    return (
      <div
        className="timeline"
        ref="timeline"
        onKeyDown={(e) => this.handleKeyDown(e)}
        onKeyUp={(e) => this.handleKeyUp(e)}>
        <div onMouseDown={() => this.props.selectBlock(null)} className="timeline__wrapper" style={{width: this.props.multiple + '%'}}>
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
  setMultiple: PropTypes.func.isRequired,
  blocks: PropTypes.array.isRequired,
  blockFilePath: PropTypes.string,
  blockFileSaved: PropTypes.bool.isRequired,
  multiple: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    blocks: state.blocks.blocks,
    blockFilePath: state.blocks.blockFilePath,
    blockFileSaved: state.blocks.blockFileSaved,
    multiple: state.timeline.multiple
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newBlockFile: () => dispatch(Actions.newBlockFile()),
    loadBlockFile: (blocks) => dispatch(Actions.loadBlockFile(blocks)),
    savedBlockFile: (path) => dispatch(Actions.savedBlockFile(path)),
    unsavedBlockFile: () => dispatch(Actions.unsavedBlockFile()),
    selectBlock: (id) => dispatch(Actions.selectBlock(id)),
    setMultiple: (multiple) => dispatch(Actions.setMultiple(multiple))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
