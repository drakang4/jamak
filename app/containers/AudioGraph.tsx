import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as fs from 'fs';
import { promisify } from 'util';
import { RootState } from '../store/rootReducer';
import AudioGraph from '../components/AudioGraph';
import Loading from '../components/AudioGraph/Loading';
import WaveformData from '../utils/waveformData';

interface Props {
  source: string;
}

interface State {
  loading: boolean;
  error: Error | null;
  waveformData: WaveformData | null;
}

class AudioGraphContainer extends PureComponent<Props, State> {
  state = {
    loading: true,
    error: null,
    waveformData: null,
  };

  async loadData() {
    const audioContext = new AudioContext();

    const { source } = this.props;

    const readFile = promisify(fs.readFile);

    const { buffer } = await readFile(source);

    if (!(buffer instanceof ArrayBuffer)) {
      this.setState({
        loading: false,
        error: new TypeError('Buffer data have to be type of ArrayBuffer'),
        waveformData: null,
      });

      return;
    }

    const audioBuffer = await audioContext.decodeAudioData(buffer);

    const channels = [...Array(audioBuffer.numberOfChannels).keys()].map(
      index => audioBuffer.getChannelData(index),
    );

    const mergedChannel = new Float32Array(audioBuffer.length);

    // Merge all channels.
    for (let i = 0; i < audioBuffer.length; i++) {
      let sample = 0;

      for (const channel of channels) {
        sample += channel[i];
      }

      sample = sample / channels.length;

      mergedChannel[i] = sample;
    }

    const waveformData = new WaveformData(mergedChannel);

    this.setState({
      loading: false,
      error: null,
      waveformData,
    });
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.source !== this.props.source) {
      this.loadData();
    }
  }

  render() {
    const { loading, error, waveformData } = this.state;

    if (!error && !loading && waveformData !== null) {
      return <AudioGraph {...this.props} waveformData={waveformData} />;
    }

    if (error) {
      throw error;
    }

    if (loading) {
      return <Loading />;
    }

    return null;
  }
}

const mapStateToProps = (state: RootState) => ({
  source: state.player.source,
});

export default connect(mapStateToProps)(AudioGraphContainer);
