import React, { PureComponent, createRef } from 'react';
import { FastLayer, Shape, Layer } from 'react-konva';
import Konva from 'konva';
import withSize from '../Timeline/withSize';
import { withTheme } from '../../styles/styled-components';
import { ThemeInterface } from '../../styles/theme';
import WaveformData from '../../utils/waveformData';

interface Props {
  waveformData: WaveformData;
  width: number;
  height: number;
  zoomMultiple: number;
  theme: ThemeInterface;
}

class AudioGraph extends PureComponent<Props> {
  waveform = createRef<Konva.Shape>();

  scaleY = (amplitude: number) => {
    return amplitude * this.props.height * 0.4;
  };

  sceneFunc = (context: Konva.Context, shape: Konva.Shape) => {
    const { width, zoomMultiple, waveformData } = this.props;

    context.beginPath();

    for (let x = 0; x < width * zoomMultiple; x++) {
      const amplitude = waveformData.at(x, width * zoomMultiple);

      context.lineTo(x + 0.5, this.scaleY(amplitude) + 0.5);
    }

    context.closePath();

    context.fillShape(shape);
  };

  componentDidMount() {
    const waveform = this.waveform.current;

    if (!waveform) {
      return;
    }

    waveform.cache();
  }

  componentDidUpdate() {
    console.log('AudioGraph updated');
  }

  componentWillUnmount() {
    const waveform = this.waveform.current;

    if (!waveform) {
      return;
    }

    waveform.clearCache();
  }

  render() {
    const { height, theme } = this.props;

    return (
      <FastLayer>
        <Shape
          fill={theme.pallete.gray[7]}
          y={height}
          scaleY={-1}
          sceneFunc={this.sceneFunc}
          dashEnabled={false}
          strokeEnabled={false}
          listening={false}
          shadowForStrokeEnabled={false}
          perfectDrawEnabled={false}
        />
      </FastLayer>
    );
  }
}

export default withSize(withTheme(AudioGraph));
