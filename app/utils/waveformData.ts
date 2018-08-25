interface WaveformDataOptions {}

export default class WaveformData {
  data: Float32Array;
  audioContext = new AudioContext();

  constructor(rawData: Float32Array, options?: WaveformDataOptions) {
    this.data = rawData;
  }

  // 1. Bucket raw data
  // 2. Get bucketed data by position
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
