import React from 'react';
import styled from '../../styles/styled-components';
import RecentFile from './RecentFile';

const Wrapper = styled.div``;

const Title = styled.p`
  color: ${props => props.theme.pallete.gray[5]};
  line-height: 1;
  margin: 0;
  margin-bottom: 24px;
`;

const RecentFileList = () => (
  <Wrapper>
    <Title>Recent files</Title>
    <RecentFile />
  </Wrapper>
);

export default RecentFileList;
