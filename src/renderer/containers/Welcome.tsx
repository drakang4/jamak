import path from 'path';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../store/rootReducer';
import Welcome from '../components/Welcome';
import { actions as subtitleActions } from '../store/modules/subtitle';

const { newData } = subtitleActions;

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
