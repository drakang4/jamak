import React, { createRef } from 'react';
import { Stage } from 'react-konva';
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
`;

const InnerWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${props => props.theme.pallete.gray[9]};
`;

const ScrollableWrapper = styled.div`
  flex: 1;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const SizedWrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: 100%;
`;

interface Props {
  loaded: boolean;
  currentTime: number;
  duration: number;
  playing: boolean;
  seeking: boolean;
  subtitles: Subtitle[];
  selectedIndex: number[];
  multiple: number;
  seek(nextTime: number): void;
  endSeek(playbackOnSeekEnd: boolean): void;
  selectSubtitle(indexes: number[]): void;
  addSubtitle(subtitle: Subtitle): void;
  updateSubtitle({
    index,
    subtitle,
  }: {
    index: number;
    subtitle: Subtitle;
  }): void;
  deleteSubtitle(index: number): void;
  setMultiple(multiple: number): void;
}

interface State {
  dx: number;
  width: number;
  height: number;
}

class Timeline extends React.Component<Props, State> {
  state = {
    dx: 0,
    width: 0,
    height: 0,
  };

  handleWheel: React.WheelEventHandler = event => {
    const { multiple, setMultiple } = this.props;
    if (event.altKey) {
      if (event.deltaY > 0) {
        if (multiple > 1) {
          setMultiple(multiple / 2);
        }
      } else {
        setMultiple(multiple * 2);
      }
    }
  };

  handleScroll: React.ReactEventHandler = event => {
    const dx = event.currentTarget.scrollLeft;

    this.setState({ dx });
  };

  handleResize = (width: number, height: number) => {
    this.setState({ width, height });
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
      multiple,
      seek,
      endSeek,
      selectSubtitle,
      addSubtitle,
      updateSubtitle,
      deleteSubtitle,
    } = this.props;

    const { dx, width, height } = this.state;

    return (
      <Wrapper>
        <Controls
          currentTime={currentTime}
          duration={duration}
          onAdd={addSubtitle}
          onClear={updateSubtitle}
          onDelete={deleteSubtitle}
        />
        <InnerWrapper>
          <TimeBar currentTime={currentTime} duration={duration} />
          <ScrollableWrapper onScroll={this.handleScroll}>
            <ResizeDetector
              handleWidth
              handleHeight
              refreshMode="debounce"
              refreshRate={16} // ~60fps
              onResize={this.handleResize}
            />
            <SizedWrapper
              onWheel={this.handleWheel}
              style={{ width: `${multiple * 100}%` }}
            >
              {/* TODO: Perfomance optimization
              https://stackoverflow.com/a/42787941/7785932 */}
              <Stage
                style={{
                  transform: `translate(${dx}px`,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                x={-dx}
                width={width}
                height={height}
              >
                <SizeContext.Provider
                  value={{ width, height, zoomMultiple: multiple }}
                >
                  {loaded && (
                    <>
                      <BlockList
                        subtitles={subtitles}
                        selectedIndex={selectedIndex}
                        duration={duration}
                        selectSubtitle={selectSubtitle}
                        updateSubtitle={updateSubtitle}
                      />
                      {/* <AudioGraphContainer /> */}
                    </>
                  )}
                  <ProgressBar
                    currentTime={currentTime}
                    duration={duration}
                    playing={playing}
                    seeking={seeking}
                    onSeek={seek}
                    onEndSeek={endSeek}
                  />
                </SizeContext.Provider>
              </Stage>
            </SizedWrapper>
            {/* <ScalableWrapper style={{ width: `${multiple * 100}%` }}>
              <LinesWrapper onWheel={this.onWheel}>
              <AudioGraphContainer />
              </LinesWrapper>
            </ScalableWrapper> */}
          </ScrollableWrapper>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default Timeline;
