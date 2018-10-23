import React from 'react';
import styled from '../../styles/styled-components';

import ButtonList from './ButtonList';
import RecentFileList from './RecentFileList';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
`;

interface Props {
  subtitleReady: boolean;
  videoReady: boolean;
  subtitleFileName: string;
  videoFileName: string;
  newData(): void;
}

const Welcome: React.SFC<Props> = ({
  subtitleReady,
  videoReady,
  subtitleFileName,
  videoFileName,
  newData,
}) => (
  <Wrapper>
    <ButtonList
      subtitleReady={subtitleReady}
      videoReady={videoReady}
      subtitleFileName={subtitleFileName}
      videoFileName={videoFileName}
      newData={newData}
    />
    <RecentFileList />
  </Wrapper>
);

export default Welcome;
