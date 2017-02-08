import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Video from './Video';
import Controls from './Controls';
import styles from './styles.css';

const Player = (props) => {
  const {
    videoPath,
    playing,
    muted,
    currentTime,
    seeking,
    onTogglePlay,
    onToggleMute,
    onUpdateCurrentTime,
    onUpdateDuration,
    onEndPlay,
  } = props;
  return (
    <div styleName="player">
      <Video
        videoPath={videoPath}
        playing={playing}
        muted={muted}
        currentTime={currentTime}
        seeking={seeking}
        onUpdateCurrentTime={onUpdateCurrentTime}
        onUpdateDuration={onUpdateDuration}
        onEndPlay={onEndPlay} />
      <Controls
        playing={playing}
        muted={muted}
        onTogglePlay={onTogglePlay}
        onToggleMute={onToggleMute} />
    </div>
  );
};

Player.propTypes = {
  videoPath: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  seeking: PropTypes.bool.isRequired,
  onTogglePlay: PropTypes.func.isRequired,
  onToggleMute: PropTypes.func.isRequired,
  onUpdateCurrentTime: PropTypes.func.isRequired,
  onUpdateDuration: PropTypes.func.isRequired,
  onEndPlay: PropTypes.func.isRequired,
};

export default CSSModules(Player, styles);
