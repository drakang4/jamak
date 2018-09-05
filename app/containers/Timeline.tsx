import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../store/rootReducer';
import { actions as playerActions } from '../store/modules/player';
import { actions as subtitleActions } from '../store/modules/subtitle';
import { actions as timelineActions } from '../store/modules/timeline';
import Timeline from '../components/Timeline';

const { seek, endSeek } = playerActions;
const {
  selectSubtitle,
  addSubtitle,
  updateSubtitle,
  deleteSubtitle,
} = subtitleActions;
const { setMultiple } = timelineActions;

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
