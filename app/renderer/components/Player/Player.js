import PropTypes from 'prop-types';
import React from 'react';
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
    blocks,
    currentBlockId,
    onTogglePlay,
    onToggleMute,
    onUpdateCurrentTime,
    onUpdateDuration,
    onEndPlay,
    updateCurrentBlock,
    updateBlockText,
  } = props;
  return (
    <div styleName="player">
      <Video
        videoPath={videoPath}
        playing={playing}
        muted={muted}
        currentTime={currentTime}
        seeking={seeking}
        blocks={blocks}
        currentBlockId={currentBlockId}
        onUpdateCurrentTime={onUpdateCurrentTime}
        onUpdateDuration={onUpdateDuration}
        onEndPlay={onEndPlay}
        updateCurrentBlock={updateCurrentBlock}
        updateBlockText={updateBlockText} />
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
  blocks: PropTypes.array.isRequired,
  currentBlockId: PropTypes.number.isRequired,
  onTogglePlay: PropTypes.func.isRequired,
  onToggleMute: PropTypes.func.isRequired,
  onUpdateCurrentTime: PropTypes.func.isRequired,
  onUpdateDuration: PropTypes.func.isRequired,
  onEndPlay: PropTypes.func.isRequired,
  updateCurrentBlock: PropTypes.func.isRequired,
  updateBlockText: PropTypes.func.isRequired,
};

export default CSSModules(Player, styles);
