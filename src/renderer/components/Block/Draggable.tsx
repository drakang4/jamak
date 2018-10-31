import React, { Component } from 'react';
import { unfocus } from '../../utils/ui';

interface Props {
  direction?: 'horizontal' | 'vertical';
  onDragStart?(): void;
  onDragMove?(x: number, y: number): void;
  onDragEnd?(x: number, y: number): void;
}

interface State {
  dragging: boolean;
  x: number;
  y: number;
}

export default class Draggable extends Component<Props, State> {
  state = {
    dragging: false,
    x: 0,
    y: 0,
  };

  handleMouseDown: React.MouseEventHandler<HTMLDivElement> = event => {
    const { direction, onDragStart, onDragMove, onDragEnd } = this.props;

    let xPosition = 0;
    let yPosition = 0;

    if (onDragStart) {
      onDragStart();
    }

    this.setState({ dragging: true, x: 0, y: 0 });

    const handleMouseMove = (moveEvent: MouseEvent) => {
      unfocus(window);

      if (direction !== 'vertical') {
        xPosition += moveEvent.movementX;
      }
      if (direction !== 'horizontal') {
        yPosition += moveEvent.movementY;
      }

      if (onDragMove) {
        onDragMove(xPosition, yPosition);
      }

      this.setState({ x: xPosition, y: yPosition });
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      if (onDragEnd) {
        const { x, y } = this.state;
        onDragEnd(x, y);
      }

      this.setState({ dragging: false, x: 0, y: 0 });

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  render() {
    const { x, y } = this.state;

    return (
      <div
        style={{
          transform: `translate(${x}px, ${y}px)`,
        }}
        onMouseDown={this.handleMouseDown}
      >
        {this.props.children}
      </div>
    );
  }
}
