import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.css';

const PrepareState = ({ children, fileName, ready }) => {
  return (
    <div className={classNames(styles.prepareState, { [styles.ready]: ready, [styles.unready]: !ready })}>
      <i className={classNames('material-icons', styles.icon)}>{ready ? 'check_circle' : 'cancel'}</i>
      <div className={styles.textBox}>
        <p className={styles.label}>{children}</p>
        {ready && fileName && <p className={styles.fileName}>{fileName}</p>}
      </div>
    </div>
  );
};

PrepareState.propTypes = {
  children: PropTypes.node.isRequired,
  fileName: PropTypes.string,
  ready: PropTypes.bool,
};

PrepareState.defaultProps = {
  fileName: '',
  ready: false,
};

export default PrepareState;
