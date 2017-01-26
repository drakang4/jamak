import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './styles.css';

const cx = classNames.bind(styles);

const Resizer = ({ type }) => {
  const handleResizerDown = (event) => {
    event.preventDefault();
    event.stopPropagation();

    let mouseMoveListener;
    let mouseUpListener;

    if (type === 'horizontal') {
      mouseMoveListener = (e) => {
        let left = e.clientX;
        if (left < 200) {
          left = 200;
        }
        if (document.body.clientWidth - left < 200) {
          left = document.body.clientWidth - 200;
        }

        this.props.onResizerMoveHor(left);
      };
    } else if (type === 'vertical') {
      mouseMoveListener = (e) => {
        let top = e.clientY;
        if (top < 200) {
          top = 200;
        }
        if (document.body.clientHeight - top < 200) {
          top = document.body.clientHeight - 200;
        }
        this.props.onResizerMoveVer(top);
      };
    }

    mouseUpListener = (e) => {
      e.preventDefault();
      document.removeEventListener('mousemove', mouseMoveListener);
      document.removeEventListener('mouseup', mouseUpListener);
    };

    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('mouseup', mouseUpListener);
  };

  const className = cx({
    resizer: true,
    [`resizer--${this.props.type}`]: true,
  });

  let style;
  if (this.props.type === 'horizontal') {
    style = { left };
  } else if (this.props.type === 'vertical') {
    style = { top };
  }

  return (
    <div className={className} style={style} onMouseDown={handleResizerDown} />
  );
};

Resizer.propTypes = {
  type: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
};

export default Resizer;
