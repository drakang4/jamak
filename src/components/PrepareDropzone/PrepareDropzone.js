import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import { ipcRenderer } from 'electron';
import path from 'path';
import validator from 'validator';
import { subtitleTypes, videoTypes } from '../../constants/fileTypes';

import Button from '../Button/Button';
import styles from './styles.css';

const PrepareDropzone = ({ videoReady, subtitleReady, onVideoOpen, onSubtitleOpen, onSubtitleNew }) => {
  ipcRenderer.on('open-video', (event) => {
    onVideoOpen();
  });

  ipcRenderer.on('open-file', (event) => {
    onSubtitleOpen();
  });

  ipcRenderer.on('new-file', (event) => {
    onSubtitleNew();
  });

  const handleDrop = (files) => {
    files.forEach((file) => {
      const filePath = file.path;
      const ext = path.extname(filePath).substring(1);

      if (validator.isIn(ext, subtitleTypes)) {
        ipcRenderer.send('ask-open-file', filePath);
      } else if (validator.isIn(ext, videoTypes)) {
        ipcRenderer.send('ask-open-video', filePath);
      }
    });
  };

  const loadVideoButtonClick = (event) => {
    event.preventDefault();
    ipcRenderer.send('ask-open-video-dialog');
  };

  const loadFileButtonClick = (event) => {
    event.preventDefault();
    ipcRenderer.send('ask-open-file-dialog');
  };

  const newFileButtonClick = (event) => {
    event.preventDefault();
  };

  const startButtonClick = (event) => {
    event.preventDefault();
  };

  return (
    <Dropzone disableClick
      styleName="default"
      activeClassName="active"
      onDrop={handleDrop} >
      <div>
        <div styleName="text">자막 편집을 시작하려면<br />파일을 드래그 앤 드랍하세요</div>
        <img styleName="icon big" src="../src/assets/icons/ic-file-load.svg" alt="file upload" />
        <div styleName="text">또는</div>
        <div>
          <Button onClick={loadVideoButtonClick}>비디오 불러오기</Button>
          <Button onClick={loadFileButtonClick}>자막 불러오기</Button>
          <Button onClick={newFileButtonClick}>새 자막 만들기</Button>
        </div>
        <div styleName="status-container">
          <div styleName="icon-container">
            <i className="material-icons">check_circle</i>
            <img styleName="icon" src={videoReady ? '../src/assets/icons/ic-ok-circle.svg' : '../src/assets/icons/ic-x-circle-o.svg'} alt="video ready" />
            <span>비디오</span>
          </div>
          <div styleName="icon-container">
            <img styleName="icon" src={subtitleReady ? '../src/assets/icons/ic-ok-circle.svg' : '../src/assets/icons/ic-x-circle-o.svg'} alt="subtitle ready" />
            <span>자막</span>
          </div>
        </div>
        <div>
          {videoReady && subtitleReady ? (
            <Link replace to="/editor">
              <Button>편집 시작하기</Button>
            </Link>
          ) : (
            <Button>편집 시작하기</Button>
          )}
        </div>
      </div>
    </Dropzone>
  );
};

PrepareDropzone.propTypes = {
  videoReady: PropTypes.bool.isRequired,
  subtitleReady: PropTypes.bool.isRequired,
  onVideoOpen: PropTypes.func.isRequired,
  onSubtitleOpen: PropTypes.func.isRequired,
  onSubtitleNew: PropTypes.func.isRequired,
};

export default CSSModules(PrepareDropzone, styles, { allowMultiple: true });
