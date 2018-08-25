import React from 'react';
import styled from 'styled-components';
import * as CSS from 'csstype';

const Wrapper = styled.div`
  flex: 1;
  position: relative;
  outline: 0;
`;

interface IProps {
  type?: 'vertical' | 'horizontal';
  size?: string | number;
  children?: React.ReactNode;
}

class Pane extends React.PureComponent<IProps> {
  public render() {
    const { type, size, children } = this.props;

    const style: {
      width?: string | number;
      height?: string | number;
      flex?: CSS.FlexProperty<any>;
    } = {};

    if (size !== undefined) {
      if (type === 'vertical') {
        style.width = size;
      } else {
        style.height = size;
      }
      style.flex = 'none';
    }

    return <Wrapper style={style}>{children}</Wrapper>;
  }
}

export default Pane;
