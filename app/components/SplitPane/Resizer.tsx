import React from 'react';
import styled from '../../styles/styled-components';
import Cursor from '../Cursor';

const Wrapper = styled.span<{
  type: 'vertical' | 'horizontal';
  resizeDisabled: boolean;
}>`
  background-color: ${props => props.theme.pallete.black};
  background-clip: padding-box;
  box-sizing: border-box;
  z-index: 1;

  ${props =>
    props.type === 'vertical'
      ? `
        width: 6px;
        margin: 0 -2px;
        border-left: 2px solid transparent;
        border-right: 2px solid transparent;
        cursor: ew-resize;
        `
      : `
        height: 6px;
        margin: -2px 0;
        border-top: 2px solid transparent;
        border-bottom: 2px solid transparent;
        cursor: ns-resize;
        width: 100%;
        `};
`;

interface IProps {
  type: 'vertical' | 'horizontal';
  active: boolean;
  resizeDisabled: boolean;
  onMouseDown(event: any): void;
}

class Resizer extends React.Component<IProps> {
  public render() {
    const { type, active, resizeDisabled, onMouseDown } = this.props;

    return (
      <Wrapper
        type={type}
        resizeDisabled={resizeDisabled}
        onMouseDown={onMouseDown}
      >
        <Cursor
          active={active}
          cursor={type === 'vertical' ? 'ew-resize' : 'ns-resize'}
        />
      </Wrapper>
    );
  }
}

export default Resizer;
