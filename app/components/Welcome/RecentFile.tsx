import React from 'react';
import styled from '../../styles/styled-components';

const Wrapper = styled.div`
  border-radius: 8px;
`;

const VideoThumbnailWrapper = styled.div`
  background-color: ${props => props.theme.pallete.gray[4]};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const FilePathInfoWrapper = styled.div`
  background-color: ${props => props.theme.pallete.gray[0]};
  padding: 16px;
`;

const Text = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.pallete.gray[9]};
  margin: 4px 0;
`;

const RecentFile = () => (
  <Wrapper>
    <VideoThumbnailWrapper />
    <FilePathInfoWrapper>
      <Text>adsd.mp4</Text>
      <Text>adsd.srt</Text>
    </FilePathInfoWrapper>
  </Wrapper>
);

export default RecentFile;
