import React from 'react';
import styled from '../../styles/styled-components';
import formatMs from '../../utils/formatMs';

const Wrapper = styled.div`
  background-color: ${props => props.theme.pallete.gray[8]};
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

const CurrentTime = styled.span`
  color: ${props => props.theme.pallete.primary[5]};
  user-select: none;
`;

const Duration = styled.span`
  color: ${props => props.theme.pallete.gray[4]};
  user-select: none;
`;

interface IProps {
  currentTime: number;
  duration: number;
}

const TimeBar: React.SFC<IProps> = ({ currentTime, duration }) => (
  <Wrapper>
    <CurrentTime>{formatMs(currentTime * 1000)}</CurrentTime>
    <Duration>{formatMs(duration * 1000)}</Duration>
  </Wrapper>
);

export default TimeBar;
