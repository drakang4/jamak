import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../store/rootReducer';
import { actions as subtitleActions } from '../store/modules/subtitle';
import { Subtitle } from '../models/subtitle';
import SubtitleEditor from '../components/SubtitleEditor';

interface Props {
  currentTime: number;
  subtitles: Subtitle[];
  updateSubtitle({
    index,
    subtitle,
  }: {
    index: number;
    subtitle: Subtitle;
  }): void;
}

class SubtitleEditorContainer extends PureComponent<Props> {
  render() {
    const { currentTime, subtitles, updateSubtitle } = this.props;

    const currentIndex = subtitles.findIndex(
      s => s.startTime <= currentTime * 1000 && s.endTime >= currentTime * 1000,
    );

    const currentSubtitle =
      currentIndex === -1 ? null : subtitles[currentIndex];

    return (
      <SubtitleEditor
        currentIndex={currentIndex}
        currentSubtitle={currentSubtitle}
        updateSubtitle={updateSubtitle}
      />
    );
  }
}

const { updateSubtitle } = subtitleActions;

const mapStateToProps = (state: RootState) => ({
  currentTime: state.player.currentTime,
  subtitles: state.subtitle.data,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ updateSubtitle }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubtitleEditorContainer);
