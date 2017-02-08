import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

class SubtitleBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 1,
    };
  }

  onInput = (event) => {
    const value = event.target.value;
    const linebreaks = value.match(/\n/g);
    if (linebreaks === null) {
      this.setState({ rows: 1 });
    } else {
      this.setState({ rows: linebreaks.length + 1 });
    }
  }


  render() {
    return (
      <div styleName="subtitle-box">
        <textarea
          autoFocus
          type="text"
          name="subtitle-box"
          styleName="textarea"
          rows={this.state.rows}
          onInput={this.onInput} />
      </div>
    );
  }
}

SubtitleBox.propTypes = {

};

export default CSSModules(SubtitleBox, styles);
