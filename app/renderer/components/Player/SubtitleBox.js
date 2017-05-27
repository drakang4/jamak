import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

class SubtitleBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 1,
      cols: 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentBlockId !== 0 && nextProps.currentBlockId !== this.props.currentBlockId) {
      const subtitleArray = this.props.blocks[nextProps.currentBlockId - 1].subtitle.split(/\n/g);
      this.setSize(subtitleArray);
    }
  }

  onInput = (event) => {
    const value = event.target.value;
    const subtitleArray = value.split(/\n/g);
    this.setSize(subtitleArray);
    this.props.updateBlockText(this.props.currentBlockId, value);
  }

  setSize = (subtitleArray) => {
    const longestString = subtitleArray.reduce((longest, current) => (
      current.length > longest.length ? current : longest
    ), '');
    this.setState({
      rows: subtitleArray.length,
      cols: longestString.length,
    });
  }

  render() {
    return (
      <div styleName="subtitle-box">
        <textarea
          autoFocus
          type="text"
          name="subtitle-box"
          styleName="textarea"
          disabled={this.props.currentBlockId === 0}
          value={this.props.currentBlockId === 0 ? '' : this.props.blocks[this.props.currentBlockId - 1].subtitle}
          rows={this.state.rows}
          cols={this.state.cols}
          onInput={this.onInput} />
      </div>
    );
  }
}

SubtitleBox.propTypes = {
  currentBlockId: PropTypes.number.isRequired,
  blocks: PropTypes.array.isRequired,
  updateBlockText: PropTypes.func.isRequired,
};

export default CSSModules(SubtitleBox, styles);
