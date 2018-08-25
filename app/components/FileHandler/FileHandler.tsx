import React from 'react';
import { ipcRenderer } from 'electron';
import { Subtitle } from '../../models/subtitle';

interface Props {
  data: Subtitle[];
  filepath: string;
  needSave: boolean;
  loadVideo(path: string): void;
  loadData({ filepath, data }: { filepath: string; data: Subtitle[] }): void;
  newData(): void;
  saveData({ filepath, data }: { filepath: string; data: Subtitle[] }): void;
}

class FileHandler extends React.Component<Props> {
  handleOpenVideo = (event: Event, path: string) => {
    this.props.loadVideo(path);
  };

  handleOpenSubtitle = (event: Event, filepath: string, data: Subtitle[]) => {
    this.props.loadData({ filepath, data });
  };

  handleNewSubtitle = () => {
    this.props.newData();
  };

  handleSaveOrSaveAs = () => {
    // If data is never saved before,
    if (!this.props.filepath) {
      ipcRenderer.send('request-save-as-subtitle-dialog');
    } else {
      this.props.saveData({
        filepath: this.props.filepath,
        data: this.props.data,
      });
    }
  };

  handleSaveSubtitle = (event: Event, filepath: string) => {
    this.props.saveData({
      filepath,
      data: this.props.data,
    });
  };

  componentDidMount() {
    ipcRenderer.on('open-video', this.handleOpenVideo);
    ipcRenderer.on('open-subtitle', this.handleOpenSubtitle);
    ipcRenderer.on('new-subtitle', this.handleNewSubtitle);
    ipcRenderer.on('save-or-save-as', this.handleSaveOrSaveAs);
    ipcRenderer.on('save-subtitle', this.handleSaveSubtitle);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('open-video', this.handleOpenVideo);
    ipcRenderer.removeListener('open-subtitle', this.handleOpenSubtitle);
    ipcRenderer.removeListener('new-subtitle', this.handleNewSubtitle);
    ipcRenderer.removeListener('save-or-save-as', this.handleSaveOrSaveAs);
    ipcRenderer.removeListener('save-subtitle', this.handleSaveSubtitle);
  }

  render() {
    return null;
  }
}

export default FileHandler;
