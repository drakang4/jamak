import { connect } from 'react-redux';
import { RootState } from '../reducers';
import Table from '../components/Table';

const mapStateToProps = (state: RootState) => ({
  subtitles: state.subtitle.data,
});

export default connect(mapStateToProps)(Table);
