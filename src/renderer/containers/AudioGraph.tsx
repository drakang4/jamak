import { connect } from 'react-redux';
import { RootState } from '../store/rootReducer';
import AudioGraph from '../components/AudioGraph';

const mapStateToProps = (state: RootState) => ({
  source: state.player.source,
});

export default connect(mapStateToProps)(AudioGraph);
