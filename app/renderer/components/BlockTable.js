import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playerToSrt } from '../utils/timeParser';

class BlockTable extends Component {
  render() {
    return (
      <table className="block-table">
        <thead className="block-table__header">
          <tr className="block-table__row block-table__row--header">
            <th className="block-table__item block-table__item--header">ID</th>
            <th className="block-table__item block-table__item--header">Start Time</th>
            <th className="block-table__item block-table__item--header">End Time</th>
            <th className="block-table__item block-table__item--header">Subtitle</th>
          </tr>
        </thead>
        <tbody className="block-table__body">
          {this.props.blocks.map((block, index) =>
            <tr key={index} className="block-table__row">
              <td className="block-table__item">{block.id}</td>
              <td className="block-table__item">{playerToSrt(block.startTime)}</td>
              <td className="block-table__item">{playerToSrt(block.endTime)}</td>
              <td className="block-table__item">{block.subtitle}</td>
            </tr>,
          )}
        </tbody>
      </table>
    );
  }
}

BlockTable.propTypes = {
  blocks: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    blocks: state.blocks.blocks,
  };
};

export default connect(mapStateToProps)(BlockTable);
