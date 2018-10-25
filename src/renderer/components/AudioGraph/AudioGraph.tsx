import React, { PureComponent, createRef } from 'react';
import { FastLayer, Shape, Layer } from 'react-konva';
import Konva from 'konva';
import { withTheme } from '../../styles/styled-components';
import { ThemeInterface } from '../../styles/theme';
import WaveformData from '../../utils/waveformData';

interface Props {
  waveformData: WaveformData;
  theme: ThemeInterface;
}

class AudioGraph extends PureComponent<Props> {
  waveform = createRef<Konva.Shape>();

  scaleY = (amplitude: number) => {
    return amplitude * this.context.height * 0.4;
  };

  sceneFunc = (context: Konva.Context, shape: Konva.Shape) => {
    const { waveformData } = this.props;
    const { width, zoomMultiple } = this.context;

    context.beginPath();

    for (let x = 0; x < width * zoomMultiple; x++) {
      const amplitude = waveformData.at(x, width * zoomMultiple);

      context.lineTo(x + 0.5, this.scaleY(amplitude) + 0.5);
    }

    context.closePath();

    context.fillShape(shape);
  };

  cacheWaveform = () => {
    const waveform = this.waveform.current;

    if (!waveform) {
      return;
    }

    waveform.cache();
  };

  componentDidMount() {
    this.cacheWaveform();
  }

  componentDidUpdate() {
    this.cacheWaveform();
  }

  componentWillUnmount() {
    const waveform = this.waveform.current;

    if (!waveform) {
      return;
    }

    waveform.clearCache();
  }

  render() {
    const { theme } = this.props;
    const { height } = this.context;

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

export default withTheme(AudioGraph);
