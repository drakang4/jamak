import React from 'react';
import {
  Column,
  AutoSizer,
  Table as VirtualTable,
  TableCellRenderer,
  TableHeaderRowRenderer,
  TableHeaderRenderer,
  TableRowRenderer,
  RowMouseEventHandlerParams,
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

interface Props {
  subtitles: Subtitle[];
  theme: ThemeInterface;
  timeUpdate(time: number): void;
  selectSubtitle(indexes: number[]): void;
}

class Table extends React.Component<Props> {
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
            onRowDoubleClick={this.handleRowDoubleClick}
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

  headerRowRenderer: TableHeaderRowRenderer = ({ columns, ...props }) => {
    return <HeaderRow {...props}>{columns}</HeaderRow>;
  };

  headerRenderer: TableHeaderRenderer = ({ dataKey, label }) => (
    <HeaderCell key={dataKey}>{label}</HeaderCell>
  );

  rowRenderer: TableRowRenderer = ({
    className,
    style,
    columns,
    index,
    rowData,
    onRowClick,
    onRowDoubleClick,
    onRowMouseOut,
    onRowMouseOver,
    onRowRightClick,
  }) => {
    const eventHandlers: {
      onClick?(event: React.MouseEvent): void;
      onDoubleClick?(event: React.MouseEvent): void;
      onMouseOut?(event: React.MouseEvent): void;
      onMouseOver?(event: React.MouseEvent): void;
      onContextMenu?(event: React.MouseEvent): void;
    } = {};

    if (onRowClick) {
      eventHandlers.onClick = event => onRowClick({ event, index, rowData });
    }
    if (onRowDoubleClick) {
      eventHandlers.onDoubleClick = event =>
        onRowDoubleClick({ event, index, rowData });
    }
    if (onRowMouseOut) {
      eventHandlers.onMouseOut = event =>
        onRowMouseOut({ event, index, rowData });
    }
    if (onRowMouseOver) {
      eventHandlers.onMouseOver = event =>
        onRowMouseOver({ event, index, rowData });
    }
    if (onRowRightClick) {
      eventHandlers.onContextMenu = event =>
        onRowRightClick({ event, index, rowData });
    }

    return (
      <Row
        key={`row-${index}`}
        role="row"
        aria-label="row"
        className={className}
        style={style}
        {...eventHandlers}
      >
        {columns}
      </Row>
    );
  };

  indexRenderer: TableCellRenderer = ({ rowIndex }) => rowIndex + 1;

  timeRenderer: TableCellRenderer = ({ cellData }) => formatMs(cellData);

  textRenderer: TableCellRenderer = ({ cellData }) => cellData.join(' ');

  handleRowDoubleClick = ({ index }: RowMouseEventHandlerParams) => {
    const { subtitles } = this.props;

    this.props.selectSubtitle([index]);
    this.props.timeUpdate(subtitles[index].startTime / 1000);
  };
}

export default withTheme(Table);
