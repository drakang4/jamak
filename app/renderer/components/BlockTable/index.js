/*const BlockTable = ({ blocks }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.header}>
        <tr className={styles.row}>
          <th className={styles.item}>ID</th>
          <th className={styles.item}>Start Time</th>
          <th className={styles.item}>End Time</th>
          <th className={styles.item}>Subtitle</th>
        </tr>
      </thead>
      <tbody className={styles.body}>
        {blocks.map((block, index) =>
          <tr key={index} className={styles.row}>
            <td className={styles.item}>{block.id}</td>
            <td className={styles.item}>{playerToSrt(block.startTime)}</td>
            <td className={styles.item}>{playerToSrt(block.endTime)}</td>
            <td className={styles.item}>{block.subtitle}</td>
          </tr>,
        )}
      </tbody>
    </table>
  );
};*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Column, Table, AutoSizer } from 'react-virtualized';

import styles from './styles.css';
import { playerToSrt } from '../../utils/timeParser';

class BlockTable extends Component {
  render() {
    const rowGetter = ({ index }) => this.props.blocks[index];
    const timeRenderer = ({ cellData }) => playerToSrt(cellData);

    return (
      <AutoSizer>
        {({ width, height }) => (
          <Table
            headerClassName={styles.header}
            gridClassName={styles.body}
            width={width}
            height={height}
            headerHeight={18}
            rowCount={this.props.blocks.length}
            rowGetter={rowGetter}
            rowHeight={24}
            overscanRowCount={10}
          >
            <Column
              className={styles.item}
              label="#"
              dataKey="id"
              width={60}
            />
            <Column
              className={styles.item}
              label="시작 시간"
              dataKey="startTime"
              cellRenderer={timeRenderer}
              width={120}
            />
            <Column
              className={styles.item}
              label="종료 시간"
              dataKey="endTime"
              cellRenderer={timeRenderer}
              width={120}
            />
            <Column
              className={styles.item}
              label="자막"
              dataKey="subtitle"
              width={120}
              flexGrow={1}
            />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

BlockTable.propTypes = {
  blocks: PropTypes.array.isRequired,
};

export default BlockTable;
