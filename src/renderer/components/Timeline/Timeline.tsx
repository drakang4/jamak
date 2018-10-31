import React from 'react';
import ResizeDetector from 'react-resize-detector';
import styled from '../../styles/styled-components';
import AudioGraphContainer from '../../containers/AudioGraph';
import BlockList from './BlockList';
import Controls from './Controls';
import TimeBar from './TimeBar';
import ProgressBar from './ProgressBar';
import { Subtitle } from '../../models/subtitle';
import SizeContext from './SizeContext';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  will-change: transform;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${props => props.theme.pallete.gray[9]};
  will-change: transform;
`;

const ScrollableWrapper = styled.div`
  position: relative;
  flex: 1;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const SizedWrapper = styled.div`
  overflow: hidden;
  height: 100%;
`;

interface Props {
  loaded: boolean;
  currentTime: number;
  duration: number;
  playing: boolean;
  seeking: boolean;
  subtitles: Subtitle[];
  selectedIndex: Set<number>;
  seek(nextTime: number): void;
  endSeek(playbackOnSeekEnd: boolean): void;
  setSelection(indexes: Set<number>): void;
  appendSelection(indexes: Set<number>): void;
  popSelection(indexes: Set<number>): void;
  addSubtitle(subtitle: Subtitle): void;
  updateSubtitle(param: { index: number; subtitle: Subtitle }): void;
  deleteSubtitle(indexes: Set<number>): void;
}

interface State {
  scrollLeft: number;
  zoomMultiple: number;
}

class Timeline extends React.Component<Props, State> {
  state = {
    scrollLeft: 0,
    zoomMultiple: 1,
  };

  handleWorkStageClick: React.MouseEventHandler<HTMLDivElement> = event => {
    if (event.target === event.currentTarget) {
      this.props.setSelection(new Set());
    }
  };

  handleScroll: React.UIEventHandler<HTMLDivElement> = event => {
    this.setState({ scrollLeft: event.currentTarget.scrollLeft });
  };

  handleZoom: React.WheelEventHandler = event => {
    if (event.altKey) {
      if (event.deltaY > 0) {
        if (this.state.zoomMultiple > 1) {
          this.setState(prevState => ({
            zoomMultiple: prevState.zoomMultiple / 2,
          }));
        }
      } else {
        this.setState(prevState => ({
          zoomMultiple: prevState.zoomMultiple * 2,
        }));
      }
    }
  };

  render() {
    const {
      loaded,
      currentTime,
      duration,
      playing,
      seeking,
      subtitles,
      selectedIndex,
      seek,
      endSeek,
      setSelection,
      appendSelection,
      popSelection,
      addSubtitle,
      updateSubtitle,
      deleteSubtitle,
    } = this.props;

    const { zoomMultiple, scrollLeft } = this.state;

    return (
      <Wrapper>
        <Controls
          currentTime={currentTime}
          duration={duration}
          selectedIndex={selectedIndex}
          onAdd={addSubtitle}
          onClear={updateSubtitle}
          onDelete={deleteSubtitle}
        />
        <InnerWrapper>
          <TimeBar currentTime={currentTime} duration={duration} />
          <ScrollableWrapper
            onScroll={this.handleScroll}
            onWheel={this.handleZoom}
          >
            {/* <- 이게 실제로 스크롤 되는 Box임 */}
            <ResizeDetector
              handleWidth
              handleHeight
              refreshMode="debounce"
              refreshRate={16} // ~60fps
            >
              {(width: number, height: number) => (
                <SizeContext.Provider
                  value={{ width, height, zoomMultiple, scrollLeft }}
                >
                  <SizedWrapper style={{ width: `${zoomMultiple * 100}%` }}>
                    <ProgressBar
                      currentTime={currentTime}
                      duration={duration}
                      playing={playing}
                      seeking={seeking}
                      onSeek={seek}
                      onEndSeek={endSeek}
                    />
                    {loaded && (
                      <>
                        <BlockList
                          subtitles={subtitles}
                          selectedIndex={selectedIndex}
                          duration={duration}
                          setSelection={setSelection}
                          appendSelection={appendSelection}
                          popSelection={popSelection}
                          updateSubtitle={updateSubtitle}
                          deleteSubtitle={deleteSubtitle}
                          seek={seek}
                          endSeek={endSeek}
                        />
                        <AudioGraphContainer />
                      </>
                    )}
                  </SizedWrapper>
                </SizeContext.Provider>
              )}
            </ResizeDetector>
          </ScrollableWrapper>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default Timeline;
