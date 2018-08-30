import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import Table from '../components/Table';
import { selectSubtitle } from '../actions/subtitle';
import { timeUpdate } from '../actions/player';

const mapStateToProps = (state: RootState) => ({
  subtitles: state.subtitle.data,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      selectSubtitle,
      timeUpdate,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table);
