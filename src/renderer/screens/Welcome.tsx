import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Helmet from 'react-helmet';
import path from 'path';
import { ipcRenderer } from 'electron';
import styled from '../styles/styled-components';
import WelcomeContainer from '../containers/Welcome';
import { subtitleExt, videoExt } from '../../common/fileExtSet';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  background-color: ${props => props.theme.pallete.gray[9]};
  padding: 3rem;
  box-sizing: border-box;
`;

const DropOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${props => props.theme.pallete.gray[0]};
  font-size: 1.5rem;
`;

const Header = styled.h1`
  font-size: 2rem;
  margin: 0;
  margin-bottom: 16px;
  color: ${props => props.theme.pallete.gray[0]};
`;

const SubHeader = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  margin-bottom: 72px;
  color: ${props => props.theme.pallete.gray[5]};
`;

class Welcome extends Component {
  handleDrop = (acceptedFiles: File[], rejectedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const ext = path.extname(file.path);

      if (videoExt.has(ext)) {
        ipcRenderer.send('request-open-video', file.path);
      } else if (subtitleExt.has(ext)) {
        ipcRenderer.send('request-open-subtitle', file.path);
      }
    });
  };

  render() {
    return (
      <Dropzone accept="video/*, audio/*" disableClick onDrop={this.handleDrop}>
        {({ isDragActive }) => {
          return (
            <Wrapper>
              <Helmet>
                <title>Jamak</title>
              </Helmet>
              {isDragActive && <DropOverlay>Drop files here</DropOverlay>}
              <Header>Jamak</Header>
              <SubHeader>Load a subtitle and a video file.</SubHeader>
              <WelcomeContainer />
            </Wrapper>
          );
        }}
      </Dropzone>
    );
  }
}

export default Welcome;
