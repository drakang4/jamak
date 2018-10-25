import React, { Component, createRef } from 'react';
import { Group, Rect } from 'react-konva';
import Konva from 'konva';
import { withTheme } from '../../styles/styled-components';
import { ThemeInterface } from '../../styles/theme';

interface Props {
  selectedIndex: number | undefined;
  theme: ThemeInterface;
}

interface State {
  transforming: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  anchorSize: number;
}

class Transformer extends Component<Props, State> {
  transformer = createRef<Konva.Group>();
  rect = createRef<Konva.Rect>();
  leftAnchor = createRef<Konva.Rect>();
  rightAnchor = createRef<Konva.Rect>();

  state = {
    transforming: false,
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 },
    anchorSize: 8,
  };

  componentDidMount() {
    this.attachNode();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props !== prevProps) {
      this.attachNode();
    }
  }

  getNode = () => {
    const { selectedIndex } = this.props;

    const transformer = this.transformer.current!;

    if (typeof selectedIndex === 'number' && selectedIndex >= 0) {
      const layer = transformer.getLayer();
      const node = layer.findOne(`.${selectedIndex}`);

      return node;
    }

    return null;
  };

  attachNode = () => {
    const selectedBlock = this.getNode();

    if (selectedBlock) {
      const { width, height } = selectedBlock.getSize();
      const { x, y } = selectedBlock.getPosition();

      this.setState({ size: { width, height }, position: { x, y } });
    }
  };

  fadeInRect = () => {
    const { theme } = this.props;

    this.rect.current!.to({
      fill: theme.pallete.primary[4],
      duration: 0.2,
      easing: Konva.Easings.EaseOut,
    });
  };

  fadeOutRect = () => {
    this.rect.current!.to({
      fill: 'rgba(0,0,0,0)',
      duration: 0.2,
      easing: Konva.Easings.EaseOut,
    });
  };

  handleDragStart: Konva.HandlerFunc<MouseEvent> = () => {
    this.setState({
      transforming: true,
    });

    this.fadeInRect();

    const selectedBlock = this.getNode();

    if (selectedBlock) {
      selectedBlock.fire('transformstart');
    }
  };

  handleDragMove: Konva.HandlerFunc<MouseEvent> = () => {
    const { transforming } = this.state;

    const leftAnchor = this.leftAnchor.current!;
    const rightAnchor = this.rightAnchor.current!;

    if (transforming) {
      const selectedBlock = this.getNode();

      if (selectedBlock) {
        const width =
          Math.abs(rightAnchor.getAbsolutePosition().x) -
          Math.abs(leftAnchor.getAbsolutePosition().x);

        const x = this.state.position.x + leftAnchor.getPosition().x;

        this.setState(prevState => ({
          size: { width, height: prevState.size.height },
          position: {
            x,
            y: prevState.position.y,
          },
        }));

        selectedBlock.fire('transform');
      }
    }
  };

  handleDragEnd: Konva.HandlerFunc<MouseEvent> = () => {
    const { transforming } = this.state;

    if (transforming) {
      this.setState({ transforming: false });

      this.fadeOutRect();

      const selectedBlock = this.getNode();

      const transformer = this.transformer.current!;

      if (selectedBlock) {
        selectedBlock.fire('transformend', { transformer });
      }
    }
  };

  render() {
    const { selectedIndex, theme } = this.props;
    const { position, size, anchorSize } = this.state;

    return (
      <Group
        ref={this.transformer}
        visible={typeof selectedIndex === 'number' && selectedIndex >= 0}
        width={size.width}
        height={size.height}
        x={position.x}
        y={position.y}
        name="transformer"
      >
        <Rect
          ref={this.rect}
          width={size.width}
          height={size.height}
          x={0}
          y={0}
          stroke={theme.pallete.primary[4]}
          strokeWidth={2}
          opacity={0.4}
          listening={false}
          name="transformer-rect"
        />
        <Rect
          ref={this.leftAnchor}
          width={8}
          height={8}
          x={0}
          y={size.height / 2}
          offsetX={anchorSize / 2}
          stroke={theme.pallete.primary[4]}
          strokeWidth={1}
          fill="#fff"
          name="anchor-left"
          draggable
          dragBoundFunc={pos => ({
            x: pos.x,
            y: this.leftAnchor.current!.getAbsolutePosition().y,
          })}
          dragDistance={0}
          onDragStart={this.handleDragStart}
          onDragMove={this.handleDragMove}
          onDragEnd={this.handleDragEnd}
        />
        <Rect
          ref={this.rightAnchor}
          width={8}
          height={8}
          x={size.width}
          y={size.height / 2}
          offsetX={anchorSize / 2}
          stroke={theme.pallete.primary[4]}
          strokeWidth={1}
          fill="#fff"
          name="anchor-right"
          draggable
          dragBoundFunc={pos => ({
            x: pos.x,
            y: this.rightAnchor.current!.getAbsolutePosition().y,
          })}
          dragDistance={0}
          onDragStart={this.handleDragStart}
          onDragMove={this.handleDragMove}
          onDragEnd={this.handleDragEnd}
        />
      </Group>
    );
  }
}

export default withTheme(Transformer);
