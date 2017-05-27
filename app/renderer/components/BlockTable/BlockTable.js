import PropTypes from 'prop-types';
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';
import { playerToSrt } from '../../utils/timeParser';

const BlockTable = ({ blocks }) => {
  return (
    <table styleName="table">
      <thead styleName="header">
        <tr styleName="row">
          <th styleName="item">ID</th>
          <th styleName="item">Start Time</th>
          <th styleName="item">End Time</th>
          <th styleName="item">Subtitle</th>
        </tr>
      </thead>
      <tbody styleName="body">
        {blocks.map((block, index) =>
          <tr key={index} styleName="row">
            <td styleName="item">{block.id}</td>
            <td styleName="item">{playerToSrt(block.startTime)}</td>
            <td styleName="item">{playerToSrt(block.endTime)}</td>
            <td styleName="item">{block.subtitle}</td>
          </tr>,
        )}
      </tbody>
    </table>
  );
};

BlockTable.propTypes = {
  blocks: PropTypes.array.isRequired,
};

export default CSSModules(BlockTable, styles);
