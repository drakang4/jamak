import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../store/rootReducer';
import { actions as playerActions } from '../store/modules/player';
import { actions as subtitleActions } from '../store/modules/subtitle';
import Timeline from '../components/Timeline';

const { seek, endSeek } = playerActions;
const {
  setSelection,
  appendSelection,
  popSelection,
  addSubtitle,
  updateSubtitle,
  deleteSubtitle,
} = subtitleActions;

const mapStateToProps = (state: RootState) => ({
  loaded: state.player.loaded,
  currentTime: state.player.currentTime,
  duration: state.player.duration,
  playing: state.player.playing,
  seeking: state.player.seeking,
  subtitles: state.subtitle.data,
  selectedIndex: state.subtitle.selectedIndex,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      seek,
      endSeek,
      setSelection,
      appendSelection,
      popSelection,
      addSubtitle,
      updateSubtitle,
      deleteSubtitle,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timeline);
