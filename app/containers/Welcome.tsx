import path from 'path';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../reducers';
import Welcome from '../components/Welcome';
import { newData } from '../actions/subtitle';

const mapStateToProps = (state: RootState) => ({
  subtitleReady: state.welcome.subtitleReady,
  videoReady: state.welcome.videoReady,
  subtitleFileName: path.basename(state.subtitle.filepath),
  videoFileName: path.basename(state.player.source),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ newData }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);
