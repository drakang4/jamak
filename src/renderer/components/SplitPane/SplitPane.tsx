import React from 'react';
import styled from 'styled-components';
import Pane from './Pane';
import Resizer from './Resizer';
import { getElementNode } from '../../utils/node';
import { unfocus } from '../../utils/ui';

const Wrapper = styled.div<{ type: 'vertical' | 'horizontal' }>`
  display: flex;
  flex: 1;
  position: relative;
  outline: 0;
  overflow: hidden;
  user-select: text;
  flex-direction: ${props => (props.type === 'vertical' ? 'row' : 'column')};
`;

interface Props {
  type: 'vertical' | 'horizontal';
  resizeDisabled: boolean;
  defaultSize: string;
  children: any;
}

interface IState {
  active: boolean;
  position: string;
}

class SplitPane extends React.Component<Props, IState> {
  static defaultProps = {
    type: 'vertical',
    resizeDisabled: false,
    defaultSize: '50%',
  };

  state = {
    active: false,
    position: this.props.defaultSize,
  };

  wrapper = React.createRef<Wrapper>();
  pane1 = React.createRef<Pane>();
  pane2 = React.createRef<Pane>();
  resizer = React.createRef<Resizer>();

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  render() {
    const { children, type, defaultSize, resizeDisabled } = this.props;
    const { active, position } = this.state;

    return (
      <Wrapper ref={this.wrapper} type={type}>
        <Pane ref={this.pane1} type={type} size={position}>
          {children[0]}
        </Pane>
        <Resizer
          ref={this.resizer}
          type={type}
          active={active}
          resizeDisabled={resizeDisabled}
          onMouseDown={this.onMouseDown}
        />
        <Pane ref={this.pane2} type={type}>
          {children[1]}
        </Pane>
      </Wrapper>
    );
  }

  onMouseDown = (event: MouseEvent) => {
    const { resizeDisabled, type } = this.props;

    if (!resizeDisabled) {
      unfocus(window);

      const wrapperSize =
        type === 'vertical'
          ? this.wrapper.current!.clientWidth
          : this.wrapper.current!.clientHeight;
      const splitSize = type === 'vertical' ? event.clientX : event.clientY;
      const position = `${(splitSize / wrapperSize) * 100}%`;

      this.setState({ active: true, position });
    }
  };

  onMouseMove = (event: MouseEvent) => {
    const { resizeDisabled, type } = this.props;
    const { active } = this.state;

    if (!resizeDisabled && active) {
      unfocus(window);

      const node = getElementNode(this.pane1.current);

      if (node !== null) {
        const wrapperSize =
          type === 'vertical'
            ? this.wrapper.current!.clientWidth
            : this.wrapper.current!.clientHeight;
        const splitSize = type === 'vertical' ? event.clientX : event.clientY;
        const position = `${(splitSize / wrapperSize) * 100}%`;

        this.setState({ position });
      }
    }

    requestAnimationFrame(() => this.onMouseMove);
  };

  onMouseUp = (event: MouseEvent) => {
    const { resizeDisabled } = this.props;
    const { active } = this.state;

    if (!resizeDisabled && active) {
      this.setState({ active: false });
    }
  };
}

export default SplitPane;
