import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../reducers';
import { seek, endSeek } from '../actions/player';
import {
  selectSubtitle,
  addSubtitle,
  updateSubtitle,
  deleteSubtitle,
} from '../actions/subtitle';
import { setMultiple } from '../actions/timeline';
import Timeline from '../components/Timeline';

const mapStateToProps = (state: RootState) => ({
  loaded: state.player.loaded,
  currentTime: state.player.currentTime,
  duration: state.player.duration,
  playing: state.player.playing,
  seeking: state.player.seeking,
  subtitles: state.subtitle.data,
  selectedIndex: state.subtitle.selectedIndex,
  multiple: state.timeline.multiple,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      seek,
      endSeek,
      selectSubtitle,
      addSubtitle,
      updateSubtitle,
      deleteSubtitle,
      setMultiple,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timeline);
