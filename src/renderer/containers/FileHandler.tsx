import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../store/rootReducer';
import FileHandler from '../components/FileHandler';
import { actions as playerActions } from '../store/modules/player';
import { actions as subtitleActions } from '../store/modules/subtitle';

const { loadVideo } = playerActions;
const { loadData, newData, saveData } = subtitleActions;

const mapStateToProps = (state: RootState) => ({
  data: state.subtitle.data,
  filepath: state.subtitle.filepath,
  needSave: state.subtitle.needSave,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      loadVideo,
      loadData,
      newData,
      saveData,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileHandler);
