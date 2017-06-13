import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.css';

const PrepareState = ({ children, filename, ready }) => {
  return (
    <div className={classNames(styles.prepareState, { [styles.ready]: ready, [styles.unready]: !ready })}>
      <i className={classNames('material-icons', styles.icon)}>{ready ? 'check_circle' : 'cancel'}</i>
      <div className={styles.textBox}>
        <p className={styles.label}>{children}</p>
        {ready && filename && <p className={styles.filename}>{filename}</p>}
      </div>
    </div>
  );
};

PrepareState.propTypes = {
  children: PropTypes.node.isRequired,
  filename: PropTypes.string,
  ready: PropTypes.bool,
};

PrepareState.defaultProps = {
  filename: '',
  ready: false,
};

export default PrepareState;
