  // const handleResizerDown = (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();

  //   let mouseMoveListener;
  //   let mouseUpListener;

  //   if (type === 'horizontal') {
  //     mouseMoveListener = (e) => {
  //       let left = e.clientX;
  //       if (left < 200) {
  //         left = 200;
  //       }
  //       if (document.body.clientWidth - left < 200) {
  //         left = document.body.clientWidth - 200;
  //       }

  //       this.props.onResizerMoveHor(left);
  //     };
  //   } else if (type === 'vertical') {
  //     mouseMoveListener = (e) => {
  //       let top = e.clientY;
  //       if (top < 200) {
  //         top = 200;
  //       }
  //       if (document.body.clientHeight - top < 200) {
  //         top = document.body.clientHeight - 200;
  //       }
  //       this.props.onResizerMoveVer(top);
  //     };
  //   }

  //   mouseUpListener = (e) => {
  //     e.preventDefault();
  //     document.removeEventListener('mousemove', mouseMoveListener);
  //     document.removeEventListener('mouseup', mouseUpListener);
  //   };

  //   document.addEventListener('mousemove', mouseMoveListener);
  //   document.addEventListener('mouseup', mouseUpListener);
  // };
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames/bind';
import styles from './styles.css';

const cx = classNames.bind(styles);

class Resizer extends Component {
  mouseDown = (event) => {
    event.preventDefault();
    this.props.onMouseDown(event);
  }

  render() {
    const { type, active } = this.props;
    const className = cx({
      resizer: true,
      [`${type}`]: true,
      active,
    });

    return (
      <span
        className={className}
        onMouseDown={this.mouseDown} />
    );
  }
}

Resizer.propTypes = {
  type: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  onMouseDown: PropTypes.func.isRequired,
};

export default CSSModules(Resizer, styles);
