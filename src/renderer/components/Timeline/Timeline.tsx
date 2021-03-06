import React, { Context, ProviderProps } from 'react';
import { Stage } from 'react-konva';
import Konva from 'konva';
import ResizeDetector from 'react-resize-detector';
import styled, {
  ThemeProvider,
  ThemeConsumer,
} from '../../styles/styled-components';
import AudioGraphContainer from '../../containers/AudioGraph';
import BlockList from './BlockList';
import Controls from './Controls';
import TimeBar from './TimeBar';
import ProgressBar from './ProgressBar';
import { Subtitle } from '../../models/subtitle';
import SizeContext from './SizeContext';
import { ThemeInterface } from '../../styles/theme';

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
  selectedIndex: Set<number>;
  multiple: number;
  seek(nextTime: number): void;
  endSeek(playbackOnSeekEnd: boolean): void;
  setSelection(indexes: Set<number>): void;
  appendSelection(indexes: Set<number>): void;
  popSelection(indexes: Set<number>): void;
  addSubtitle(subtitle: Subtitle): void;
  updateSubtitle(param: { index: number; subtitle: Subtitle }): void;
  deleteSubtitle(indexes: Set<number>): void;
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

  // static contextType: Context<ThemeInterface> = {
  //   Provider: ThemeProvider,
  //   Consumer: ThemeConsumer,
  // };

  handleStageClick: Konva.HandlerFunc<MouseEvent> = ({ target }) => {
    if (target.getType() !== 'Shape') {
      this.props.setSelection(new Set());
    }
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
      setSelection,
      appendSelection,
      popSelection,
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
          selectedIndex={selectedIndex}
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
              <ThemeConsumer>
                {theme => (
                  // TODO: Perfomance optimization
                  // https://stackoverflow.com/a/42787941/7785932
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
                    onClick={this.handleStageClick}
                  >
                    <ThemeProvider theme={theme}>
                      <SizeContext.Provider
                        value={{ width, height, zoomMultiple: multiple }}
                      >
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
                        <ProgressBar
                          currentTime={currentTime}
                          duration={duration}
                          playing={playing}
                          seeking={seeking}
                          onSeek={seek}
                          onEndSeek={endSeek}
                        />
                      </SizeContext.Provider>
                    </ThemeProvider>
                  </Stage>
                )}
              </ThemeConsumer>
            </SizedWrapper>
          </ScrollableWrapper>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default Timeline;
