import React, { Component, createRef } from 'react';
import { Group, Rect } from 'react-konva';
import Konva from 'konva';
import { withTheme } from '../../styles/styled-components';
import { ThemeInterface } from '../../styles/theme';

interface Props {
  selectedIndex: number;
  theme: ThemeInterface;
}

interface State {
  anchorSize: number;
}

class Transformer extends Component<Props, State> {
  transformer = createRef<Konva.Group>();
  leftAnchor = createRef<Konva.Rect>();
  rightAnchor = createRef<Konva.Rect>();

  state = {
    anchorSize: 8,
  };

  componentDidMount() {
    this.attachNode();
  }

  componentDidUpdate() {
    this.attachNode();
  }

  attachNode = () => {
    const { selectedIndex } = this.props;
    const { anchorSize } = this.state;

    const transformer = this.transformer.current!;
    const leftAnchor = this.leftAnchor.current!;
    const rightAnchor = this.rightAnchor.current!;

    if (selectedIndex >= 0) {
      if (transformer !== null) {
        // 1. Find selected block node.
        const layer = transformer.getLayer();
        const selectedBlock = layer.findOne(`.${selectedIndex}`);

        // 2. Attach transformer to the node.
        if (selectedBlock) {
          const { width, height } = selectedBlock.getSize();
          const { x, y } = selectedBlock.getPosition();

          transformer.setSize({ width, height });
          transformer.position({ x, y });
          leftAnchor.position({ x: -anchorSize / 2, y: height / 2 });
          rightAnchor.position({ x: -anchorSize / 2 + width, y: height / 2 });
        }
      }
    }
    // else {
    //   transformer.setSize({ width: 0, height: 0 });
    //   transformer.position({ x: 0, y: 0 });
    //   leftAnchor.position({ x: 0, y: 0 });
    //   rightAnchor.position({ x: 0, y: 0 });
    // }
  };

  render() {
    const { selectedIndex, theme } = this.props;

    return (
      <Group ref={this.transformer} visible={selectedIndex >= 0}>
        <Rect
          ref={this.leftAnchor}
          width={8}
          height={8}
          stroke={theme.pallete.primary[4]}
          strokeWidth={1}
          fill="#fff"
          name="anchor-left"
          draggable
          dragDistance={0}
        />
        <Rect
          ref={this.rightAnchor}
          width={8}
          height={8}
          stroke={theme.pallete.primary[4]}
          strokeWidth={1}
          fill="#fff"
          name="anchor-right"
          draggable
          dragDistance={0}
        />
      </Group>
    );
  }
}

export default withTheme(Transformer);
