import React from 'react';
import { remote, ipcRenderer } from 'electron';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from '../../styles/styled-components';

import Button from '../Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 72px;
`;

const TopWrapper = styled.div`
  flex: 1;
`;

const ReadyMarker = styled.span<{ ready: boolean }>`
  display: inline-block;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  background-color: ${props =>
    props.ready ? props.theme.pallete.primary[6] : 'transparent'};
  border: 2px solid
    ${props =>
      props.ready
        ? props.theme.pallete.primary[6]
        : props.theme.pallete.gray[5]};
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: top;
`;

const Title = styled.p`
  color: ${props => props.theme.pallete.gray[5]};
  line-height: 1;
  margin: 0;
  margin-bottom: 24px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

interface Props extends RouteComponentProps<any> {
  subtitleReady: boolean;
  videoReady: boolean;
  newData(): void;
}

const ButtonList: React.SFC<Props> = ({
  subtitleReady,
  videoReady,
  newData,
  history,
}) => {
  const handleNewSubtitle: React.MouseEventHandler = () => {
    newData();
  };

  const handleOpenSubtitle: React.MouseEventHandler = () => {
    ipcRenderer.send('request-open-subtitle-dialog');
  };

  const handleOpenVideo: React.MouseEventHandler = () => {
    ipcRenderer.send('request-open-video-dialog');
  };

  const handleClose: React.MouseEventHandler = () => {
    remote.getCurrentWindow().close();
  };

  const handleGetStarted: React.MouseEventHandler = () => {
    history.replace('/editor');
  };

  return (
    <Wrapper>
      <TopWrapper>
        <Section>
          <Title>
            <ReadyMarker ready={subtitleReady} />
            Subtitle
          </Title>
          <Button onClick={handleNewSubtitle}>New subtitle...</Button>
          <Button onClick={handleOpenSubtitle}>Open subtitle...</Button>
        </Section>
        <Section>
          <Title>
            <ReadyMarker ready={videoReady} />
            Video
          </Title>
          <Button onClick={handleOpenVideo}>Open video...</Button>
          <Button disabled>Edit without video...</Button>
        </Section>
      </TopWrapper>
      <Section style={{ marginBottom: 0 }}>
        <Button
          accent
          disabled={!subtitleReady || !videoReady}
          onClick={handleGetStarted}
        >
          Get started
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </Section>
    </Wrapper>
  );
};

export default withRouter(ButtonList);
