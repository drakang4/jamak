import React from 'react';
import { FastLayer, Shape } from 'react-konva';
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

const AudioGraph: React.SFC<Props> = ({
  waveformData,
  width,
  height,
  zoomMultiple,
  theme,
}) => {
  const scaleY = (amplitude: number) => {
    return amplitude * height * 0.4;
  };

  const sceneFunc = (context: Konva.Context, shape: Konva.Shape) => {
    context.beginPath();

    for (let x = 0; x < width * zoomMultiple; x++) {
      const amplitude = waveformData.at(x, width * zoomMultiple);

      context.lineTo(x + 0.5, scaleY(amplitude) + 0.5);
    }

    context.closePath();

    context.fillShape(shape);
  };

  return (
    <FastLayer y={height} scaleY={-1}>
      <Shape fill={theme.pallete.gray[7]} sceneFunc={sceneFunc} />
    </FastLayer>
  );
};

export default withSize(withTheme(AudioGraph));
