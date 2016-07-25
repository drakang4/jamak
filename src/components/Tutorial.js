import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TutorialContext from './TutorialContext';
import TutorialStepper from './TutorialStepper';

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.step == 1 && nextProps.url != '')
      this.setState({step: 2});
    if(this.state.step == 2 && nextProps.blockFilePath != '')
      this.setState({step: 3});
  }

  render() {
    let style = {
      display: this.props.url == '' || this.props.blockFilePath == '' ? 'block' : 'none'
    };

    return (
      <div className="tutorial" style={style}>
        <div className="tutorial__wrapper">
          <TutorialContext step={this.state.step} />
          <TutorialStepper step={this.state.step} />
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
