import PropTypes from 'prop-types';
import React from 'react';

import Video from './Video';
import Controls from './Controls';
import SubtitleBoxContainer from '../../containers/SubtitleBoxContainer';

import styles from './styles.css';

const Player = (props) => {
  const {
    currentTime, muted, playing, seeking, videoPath,
    onTogglePlay, onToggleMute, onLoadedData, onTimeUpdate, onEnded,
  } = props;
  return (
    <div className={styles.player}>
      <div className={styles.viewer}>
        <Video
          src={videoPath}
          playing={playing}
          muted={muted}
          seeking={seeking}
          currentTime={currentTime}
          onLoadedData={onLoadedData}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
        />
        <SubtitleBoxContainer />
      </div>
      <Controls
        playing={playing}
        muted={muted}
        onTogglePlay={onTogglePlay}
        onToggleMute={onToggleMute}
      />
    </div>
  );
};

Player.propTypes = {
  currentTime: PropTypes.number.isRequired,
  muted: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  seeking: PropTypes.bool.isRequired,
  videoPath: PropTypes.string.isRequired,
  onTogglePlay: PropTypes.func.isRequired,
  onToggleMute: PropTypes.func.isRequired,
  onLoadedData: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  onEnded: PropTypes.func.isRequired,
};

export default Player;
