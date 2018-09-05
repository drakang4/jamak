import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../store/rootReducer';
import Table from '../components/Table';
import { actions as subtitleActions } from '../store/modules/subtitle';
import { actions as playerActions } from '../store/modules/player';

const { selectSubtitle } = subtitleActions;
const { seek, endSeek } = playerActions;

const mapStateToProps = (state: RootState) => ({
  subtitles: state.subtitle.data,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ selectSubtitle, seek, endSeek }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table);
