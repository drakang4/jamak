import PropTypes from 'prop-types';
import React from 'react';
import Dropzone from 'react-dropzone';
import CSSModules from 'react-css-modules';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import path from 'path';
import validator from 'validator';
import { subtitleTypes, videoTypes } from '../../constants/fileTypes';

import Button from '../Button/Button';
import styles from './styles.css';

const cx = classNames.bind(styles);

const PrepareDropzone = ({ videoReady, subtitleReady, onVideoOpen, onSubtitleOpen, onSubtitleNew }) => {
  ipcRenderer.on('open-video', () => {
    onVideoOpen();
  });

  ipcRenderer.on('open-file', () => {
    onSubtitleOpen();
  });

  ipcRenderer.on('new-file', () => {
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

  const videoStateClass = cx({
    'icon-container': true,
    ready: videoReady,
    unready: !videoReady,
  });

  const subtitleStateClass = cx({
    'icon-container': true,
    ready: subtitleReady,
    unready: !subtitleReady,
  });

  return (
    <Dropzone
      disableClick
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
        <div styleName="state-container">
          <div className={videoStateClass}>
            <i className="material-icons">{videoReady ? 'check_circle' : 'cancel'}</i>
            <span>비디오</span>
          </div>
          <div className={subtitleStateClass}>
            <i className="material-icons">{subtitleReady ? 'check_circle' : 'cancel'}</i>
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
