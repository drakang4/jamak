import React, { memo } from 'react';
import styled from '../../styles/styled-components';
import formatMs from '../../utils/formatMs';
import SizeContext from '../Timeline/SizeContext';

const StyledBlock = styled.div`
  background-color: ${({ theme }) => theme.pallete.secondary[6]};
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  border: 1px inset ${({ theme }) => theme.pallete.secondary[8]};
  box-sizing: border-box;
`;

const SelectedBlock = styled(StyledBlock)`
  background-color: ${({ theme }) => theme.pallete.secondary[4]};
`;

const Text = styled.p`
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
  margin: 8px;
`;

interface Props {
  index: number;
  duration: number;
  startTime: number;
  endTime: number;
  texts: string[];
  selected: boolean;
  onSelect?: React.MouseEventHandler<HTMLDivElement>;
  onContextMenu?: React.MouseEventHandler<HTMLDivElement>;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Block: React.StatelessComponent<Props> = props => {
  const BlockComponent = props.selected ? SelectedBlock : StyledBlock;

  return (
    <SizeContext.Consumer>
      {({ width, height, zoomMultiple }) => {
        const length = (props.endTime - props.startTime) / 1000;
        const blockX =
          (props.startTime / 1000 / props.duration) * width * zoomMultiple;
        const blockWidth = (length / props.duration) * width * zoomMultiple;
        const blockHeight = height * 0.4;

        return (
          <BlockComponent
            style={{ left: blockX, width: blockWidth, height: blockHeight }}
            onMouseDown={props.onSelect}
            onContextMenu={props.onContextMenu}
            onDoubleClick={props.onDoubleClick}
          >
            <Text>{`${formatMs(props.startTime)} -> ${formatMs(
              props.endTime,
            )}`}</Text>
            <Text>{props.texts.join(' ')}</Text>
          </BlockComponent>
        );
      }}
    </SizeContext.Consumer>
  );
};

export default memo(Block);
