import React from 'react';
import styled from '../styles/styled-components';
import WelcomeContainer from '../containers/Welcome';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.pallete.gray[9]};
  padding: 3rem;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
  margin-bottom: 72px;
  color: ${props => props.theme.pallete.gray[0]};
`;

const Welcome = () => (
  <Wrapper>
    <Title>Jamak</Title>
    <WelcomeContainer />
  </Wrapper>
);

export default Welcome;
