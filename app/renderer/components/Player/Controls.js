import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from './styles.css';

const Controls = ({ playing, muted, onTogglePlay, onToggleMute }) => (
  <div className={styles.controls}>
    <button
      className={classNames(styles.button, {
        [styles.play]: playing,
        [styles.pause]: !playing,
      })}
      onClick={onTogglePlay}
    >
      <svg viewBox="0 0 48 48">
        {playing ? (
          <path d="M12,38h8V10h-8V38z M28,10v28h8V10H28z" />
        ) : (
          <path d="M16,10v28l22-14L16,10z" />
        )}
      </svg>
    </button>
    <button
      className={classNames(styles.button, {
        [styles.muted]: muted,
        [styles.unmuted]: !muted,
      })}
      onClick={onToggleMute}
    >
      <svg viewBox="0 0 48 48">
        {muted ? (
          <path d="M14,18v12h8l10,10V8L22,18H14z" />
        ) : (
          <path d="M6,18v12h8l10,10V8L14,18H6z M33,24c0-3.5-2-6.6-5-8.1V32C31,30.6,33,27.5,33,24z M28,6.5v4.1c5.8,1.7,10,7.1,10,13.4s-4.2,11.7-10,13.4v4.1c8-1.8,14-9,14-17.5S36,8.3,28,6.5z" />
        )}
      </svg>
    </button>
  </div>
);

Controls.propTypes = {
  playing: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  onTogglePlay: PropTypes.func.isRequired,
  onToggleMute: PropTypes.func.isRequired,
};

export default Controls;
