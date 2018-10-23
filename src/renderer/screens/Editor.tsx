import React from 'react';
import styled from '../styles/styled-components';
import SplitPane from '../components/SplitPane';
import PlayerContainer from '../containers/Player';
import TimelineContainer from '../containers/Timeline';
import TableContainer from '../containers/Table';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const TopWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Editor = () => (
  <Wrapper>
    <SplitPane type="horizontal">
      <TopWrapper>
        <SplitPane type="vertical">
          <PlayerContainer />
          <TableContainer />
        </SplitPane>
      </TopWrapper>
      <TimelineContainer />
    </SplitPane>
  </Wrapper>
);

export default Editor;
