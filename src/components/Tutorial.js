import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };
  }

  render() {
    let style = {
      display: this.props.url == '' || this.props.blockFilePath == '' ? 'block' : 'none'
    };

    return (
      <div className="tutorial" style={style}>
        <div className="tutorial__wrapper">
          <div className="tutorial__context">
            <p className="tutorial__text">Drop your video file here</p>
            <p className="tutorial__text">to create or edit subtitle</p>
            <div className="tutorial__icon tutorial__icon--load"></div>
            <p className="tutorial__text">Or</p>
            <button className="tutorial__button ">Choose file</button>
          </div>
          <div className="tutorial__stepper">
            <svg width="40" height="8">
              <circle className={classNames({'tutorial__stepper-circle': true, 'tutorial__stepper-circle--active': this.state.step == 1})} cx="4" cy="4" r="4" />
              <circle className={classNames({'tutorial__stepper-circle': true, 'tutorial__stepper-circle--active': this.state.step == 2})} cx="20" cy="4" r="4" />
              <circle className={classNames({'tutorial__stepper-circle': true, 'tutorial__stepper-circle--active': this.state.step == 3})} cx="36" cy="4" r="4" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

Tutorial.propTypes = {
  url: PropTypes.string.isRequired,
  blockFilePath: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    url: state.player.url,
    blockFilePath: state.blocks.blockFilePath
  };
};

export default connect(mapStateToProps)(Tutorial);
