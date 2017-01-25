import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  moveResizerHor,
  moveResizerVer,
} from '../constants/actionTypes';

class Resizer extends Component {
  handleResizerDown(e) {
    e.preventDefault();
    e.stopPropagation();

    let mouseMoveListener;
    if (this.props.type == 'horizontal') {
      mouseMoveListener = (e) => {
        let left = e.clientX;
        if(left < 200)
          left = 200;
        if(document.body.clientWidth - left < 200) {
          left = document.body.clientWidth - 200;
        }

        this.props.onResizerMoveHor(left);
      };
    } else if (this.props.type == 'vertical') {
      mouseMoveListener = (e) => {
        let top = e.clientY;
        if(top < 200 )
          top = 200;
        if(document.body.clientHeight - top < 200) {
          top = document.body.clientHeight - 200;
        }
        this.props.onResizerMoveVer(top);
      };
    }

    let mouseUpListener = (e) => {
      e.preventDefault();
      document.removeEventListener('mousemove', mouseMoveListener);
      document.removeEventListener('mouseup', mouseUpListener);
    };

    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('mouseup', mouseUpListener);
  }

  componentDidMount() {
    this.props.onResizerMoveVer(400);
    this.props.onResizerMoveHor(500);
  }

  render() {
    let resizerClass = classNames({
      'resizer': true,
      [`resizer--${this.props.type}`]: true
    });

    let style;
    if (this.props.type == 'horizontal') {
      style = {left: this.props.left};
    } else if (this.props.type == 'vertical') {
      style = {top: this.props.top};
    }

    return (
      <div
        className={resizerClass}
        style={style}
        onMouseDown={this.handleResizerDown.bind(this)}
        ></div>
    );
  }
}

Resizer.propTypes = {
  onResizerMoveHor: PropTypes.func.isRequired,
  onResizerMoveVer: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    top: state.resizer.top,
    left: state.resizer.left,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onResizerMoveHor: (left) => dispatch(moveResizerHor(left)),
    onResizerMoveVer: (top) => dispatch(moveResizerVer(top)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Resizer);
