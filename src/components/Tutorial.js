import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Tutorial extends Component {
  render() {
    let style = {
      display: this.props.url == '' ? 'block' : 'none'
    };

    return (
      <div className="tutorial" style={style}>
        <div className="tutorial__context">
          <p className="tutorial__text">Drop your video file here</p>
          <p className="tutorial__text">to create or edit subtitle</p>
          <div className="tutorial__icon tutorial__icon--load"></div>
          <p className="tutorial__text">Or</p>
          <button>Choose file</button>
        </div>
      </div>
    );
  }
}

Tutorial.propTypes = {
  url: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    url: state.player.url
  };
};

export default connect(mapStateToProps)(Tutorial);
