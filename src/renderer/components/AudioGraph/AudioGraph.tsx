import React, { Component, createRef } from 'react';
import WaveformData, { buildWaveformData } from '../../utils/WaveformData';
import { promisify } from 'util';
import { readFile } from 'fs';
import Loading from './Loading';
import SizeContext from '../Timeline/SizeContext';

interface Props {
  source: string;
}

interface State {
  loading: boolean;
  waveformData: WaveformData | null;
}

class AudioGraph extends Component<Props, State> {
  state = {
    loading: false,
    waveformData: null,
  };

  static contextType = SizeContext;

  canvas = createRef<HTMLCanvasElement>();

  loadData = async () => {
    try {
      const { source } = this.props;

      console.time('readFile');
      const { buffer } = await promisify(readFile)(source);
      console.timeEnd('readFile');

      console.time('decodeAudioData');
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(
        buffer as ArrayBuffer,
      );
      console.timeEnd('decodeAudioData');

      console.log(
        audioBuffer.length,
        audioBuffer.sampleRate,
        audioBuffer.duration,
        audioBuffer.numberOfChannels,
      );

      console.time('buildWaveformData');
      const waveformData = buildWaveformData(audioBuffer);
      console.timeEnd('buildWaveformData');

      this.setState({
        loading: false,
        waveformData,
      });
    } catch (error) {
      throw error;
    }
  };

  drawWaveform = () => {
    const canvas = this.canvas.current;
    const { waveformData } = this.state;

    if (canvas && waveformData) {
      const { width, height, zoomMultiple, scrollLeft } = this.context;

      const ctx = canvas.getContext('2d')!;

      const resampled = (waveformData as WaveformData).resample(
        width,
        scrollLeft,
        zoomMultiple,
      );

      ctx.strokeStyle = '#fff';
      ctx.beginPath();
      for (let i = 0; i < width; i++) {
        const x = i;
        const y =
          (waveformData as WaveformData).at(i, canvas.width) * canvas.height;

        console.log(y);

        ctx.moveTo(x, canvas.height);
        ctx.lineTo(x + 1, y);
        ctx.stroke();
      }
      ctx.restore();
    }
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.source !== this.props.source) {
      this.loadData();
    }

    this.drawWaveform();
  }

  render() {
    const { loading, waveformData } = this.state;

    if (loading) {
      return null;
    }

    const { width, height, zoomMultiple, scrollLeft } = this.context;

    const canvasWidth = width;
    const canvasHeight = height * 0.4;

    return (
      <canvas
        ref={this.canvas}
        style={{
          width: canvasWidth,
          height: canvasHeight,
          left: scrollLeft,
          bottom: 0,
          position: 'absolute',
        }}
      />
    );
  }
}

export default AudioGraph;
