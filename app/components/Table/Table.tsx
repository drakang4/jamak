import React from 'react';
import {
  Column,
  AutoSizer,
  Table as VirtualTable,
  TableCellRenderer,
  TableHeaderRowRenderer,
  TableHeaderRenderer,
  TableRowRenderer,
} from 'react-virtualized';
import styled, { withTheme } from '../../styles/styled-components';
import { ThemeInterface } from '../../styles/theme';
import { Subtitle } from '../../models/subtitle';
import formatMs from '../../utils/formatMs';

const HeaderRow = styled.div`
  background-color: ${props => props.theme.pallete.gray[9]};
  color: ${props => props.theme.pallete.white};
`;

const HeaderCell = styled.span`
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: middle;
`;

const Row = styled.div`
  color: ${props => props.theme.pallete.gray[4]};
  border-bottom: 1px solid ${props => props.theme.pallete.gray[7]};
  box-sizing: border-box;
`;

interface IProps {
  subtitles: Subtitle[];
  theme: ThemeInterface;
}

class Table extends React.Component<IProps> {
  render() {
    const { subtitles, theme } = this.props;

    const gridStyles = { backgroundColor: theme.pallete.gray[8] };
    return (
      <AutoSizer>
        {({ width, height }) => (
          <VirtualTable
            width={width}
            height={height}
            gridStyle={gridStyles}
            headerHeight={32}
            headerRowRenderer={this.headerRowRenderer}
            rowCount={subtitles.length}
            rowGetter={this.rowGetter}
            rowHeight={32}
            rowRenderer={this.rowRenderer}
            overscanRowCount={10}
          >
            <Column
              label="#"
              dataKey="index"
              cellRenderer={this.indexRenderer}
              headerRenderer={this.headerRenderer}
              width={60}
            />
            <Column
              label="시작 시간"
              dataKey="startTime"
              cellRenderer={this.timeRenderer}
              headerRenderer={this.headerRenderer}
              width={120}
            />
            <Column
              label="종료 시간"
              dataKey="endTime"
              cellRenderer={this.timeRenderer}
              headerRenderer={this.headerRenderer}
              width={120}
            />
            <Column
              label="자막"
              dataKey="texts"
              cellRenderer={this.textRenderer}
              width={120}
              flexGrow={1}
            />
          </VirtualTable>
        )}
      </AutoSizer>
    );
  }

  rowGetter = ({ index }: { index: number }) => this.props.subtitles[index];

  headerRowRenderer: TableHeaderRowRenderer = ({
    className,
    columns,
    style,
  }) => {
    return (
      <HeaderRow className={className} style={style}>
        {columns}
      </HeaderRow>
    );
  };

  headerRenderer: TableHeaderRenderer = ({ dataKey, label }) => (
    <HeaderCell key={dataKey}>{label}</HeaderCell>
  );

  rowRenderer: TableRowRenderer = ({ className, columns, index, style }) => (
    <Row key={index} className={className} role="row" style={style}>
      {columns}
    </Row>
  );
  indexRenderer: TableCellRenderer = ({ rowIndex }) => rowIndex + 1;
  timeRenderer: TableCellRenderer = ({ cellData }) => formatMs(cellData);
  textRenderer: TableCellRenderer = ({ cellData }) => cellData.join(' ');
}

export default withTheme(Table);
