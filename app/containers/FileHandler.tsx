import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../reducers';
import FileHandler from '../components/FileHandler';
import { loadVideo } from '../actions/player';
import { loadData, newData, saveData } from '../actions/subtitle';

const mapStateToProps = (state: RootState) => ({
  data: state.subtitle.data,
  filepath: state.subtitle.filepath,
  needSave: state.subtitle.needSave,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ loadVideo, loadData, newData, saveData }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileHandler);
