import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

class TutorialStepper extends Component {
  render() {
    return (
      <div className="tutorial__stepper">
        <svg width="40" height="8">
          <circle className={classNames({'tutorial__stepper-circle': true, 'tutorial__stepper-circle--active': this.props.step == 1})} cx="4" cy="4" r="4" />
          <circle className={classNames({'tutorial__stepper-circle': true, 'tutorial__stepper-circle--active': this.props.step == 2})} cx="20" cy="4" r="4" />
          <circle className={classNames({'tutorial__stepper-circle': true, 'tutorial__stepper-circle--active': this.props.step == 3})} cx="36" cy="4" r="4" />
        </svg>
      </div>
    );
  }
}

TutorialStepper.propTypes = {
  step: PropTypes.number.isRequired
};

export default connect()(TutorialStepper);
