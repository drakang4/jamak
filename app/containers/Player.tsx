import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import * as actions from '../actions/player';
import Player from '../components/Player';

const mapStateToProps = (state: RootState) => ({
  source: state.player.source,
  playing: state.player.playing,
  muted: state.player.muted,
  seeking: state.player.seeking,
  currentTime: state.player.currentTime,
  duration: state.player.duration,
  volume: state.player.volume,
  playbackRate: state.player.playbackRate,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);
