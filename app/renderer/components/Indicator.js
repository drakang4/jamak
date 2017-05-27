import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Indicator extends Component {
  render() {
    let style = {
      left: 'calc(' + this.props.rate * 100 + '% - 4.5px)'
    };

    return (
      <div
        className="progress-bar__indicator"
        style={style}>
        <div className="progress-bar__indicator-line"></div>
      </div>
    );
  }
}

Indicator.propTypes = {
  rate: PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    rate: state.player.progressRate
  };
};

export default connect(mapStateToProps)(Indicator);
