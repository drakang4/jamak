interface WaveformDataOptions {
  dataLength: number;
  duration: number;
  sampleRate: number;

  // Actually dataLength == duration * sampleRate
}

export default class WaveformData {
  data: Float32Array;
  options: WaveformDataOptions;

  constructor(data: Float32Array, options: WaveformDataOptions) {
    this.data = data;
    this.options = options;
  }

  resample(size: number, offset: number, zoomLevel: number) {}

  at(position: number, ofSize: number) {
    const binningSize = Math.floor(this.data.length / ofSize);

    const start = position * binningSize;
    const end = start + binningSize;

    // let max = 0;
    let rms = 0;
    for (let i = start; i < end; i++) {
      // if (this.data[i] > max) {
      //   max = this.data[i];
      // }
      rms += Math.abs(this.data[i]);
    }

    rms = Math.sqrt(rms / binningSize);
    // max = Math.abs(max);

    return rms;
  }
}

export const buildWaveformData = (audioBuffer: AudioBuffer) => {
  const channels = [...new Array(audioBuffer.numberOfChannels)].map(
    (_, index) => audioBuffer.getChannelData(index),
  );

  const reducedChannel = new Float32Array(audioBuffer.length);

  for (let i = 0; i < audioBuffer.length; i++) {
    let sample = 0;

    for (const channel of channels) {
      sample += channel[i];
    }

    sample = sample / channels.length;

    reducedChannel[i] = sample;
  }

  return new WaveformData(reducedChannel, {
    dataLength: audioBuffer.length,
    duration: audioBuffer.duration,
    sampleRate: audioBuffer.sampleRate,
  });
};
