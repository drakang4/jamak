import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class BlockTable extends Component {
  render() {
    let style = {
      width: 'calc(100% - ' + this.props.left + 'px)'
    };

    return (
      <table className="block-table" style={style}>
        <thead className="block-table__header">
          <tr className="block-table__row block-table__row--header">
            <th className="block-table__item block-table__item--header">ID</th>
            <th className="block-table__item block-table__item--header">Start Time</th>
            <th className="block-table__item block-table__item--header">End Time</th>
            <th className="block-table__item block-table__item--header">Subtitle</th>
          </tr>
        </thead>
        <tbody className="block-table__body">
          {this.props.blocks.map((block) =>
            <tr key={block.id} className="block-table__row">
              <td className="block-table__item">{block.id}</td>
              <td className="block-table__item">{block.startTime}</td>
              <td className="block-table__item">{block.endTime}</td>
              <td className="block-table__item">{block.subtitle}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

BlockTable.propTypes = {
  blocks: PropTypes.array.isRequired,
  left: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    blocks: state.blocks.blocks,
    left: state.resizer.left
  };
};

export default connect(mapStateToProps)(BlockTable);
