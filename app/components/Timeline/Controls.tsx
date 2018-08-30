import React from 'react';
import styled from '../../styles/styled-components';
import { Subtitle } from '../../models/subtitle';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.pallete.gray[8]};
`;

const Button = styled.button`
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  margin: 6px;
  padding: 0;
  fill: ${props => props.theme.pallete.gray[5]};

  &:focus {
    outline: 0;
  }
`;

interface Props {
  currentTime: number;
  duration: number;
  onAdd(subtitle: Subtitle): void;
  onClear({ index, subtitle }: { index: number; subtitle: Subtitle }): void;
  onDelete(index: number): void;
}

class Controls extends React.Component<Props> {
  handleAdd: React.MouseEventHandler = () => {
    const { currentTime, duration } = this.props;

    const startTime = Math.floor(currentTime * 1000);
    const endTime =
      startTime + 3000 > duration * 1000
        ? Math.floor(duration * 1000)
        : startTime + 3000;

    this.props.onAdd({
      startTime,
      endTime,
      texts: [''],
    });
  };

  handleClear: React.MouseEventHandler = () => {
    this.props.onClear({
      index: 1,
      subtitle: { startTime: 0, endTime: 0, texts: [''] },
    });
  };

  handleDelete: React.MouseEventHandler = () => {
    this.props.onDelete(1);
  };

  render() {
    return (
      <Wrapper>
        <Button onClick={this.handleAdd}>
          <svg viewBox="0 0 36 36">
            <path d="M28.5,19.5h-9v9h-3v-9h-9v-3h9v-9h3v9h9v3Z" />
          </svg>
        </Button>
        <Button onClick={this.handleClear}>
          <svg viewBox="0 0 36 36">
            <path d="M26.47,9.52A12,12,0,1,0,29.59,21H26.47A9,9,0,1,1,18,9a8.87,8.87,0,0,1,6.33,2.67L19.5,16.5H30V6Z" />
          </svg>
        </Button>
        <Button onClick={this.handleDelete}>
          <svg viewBox="0 0 36 36">
            <path d="M28.5,9.61L26.38,7.5,18,15.89,9.61,7.5,7.5,9.61,15.88,18,7.5,26.39,9.61,28.5,18,20.11l8.39,8.39,2.11-2.11L20.11,18Z" />
          </svg>
        </Button>
      </Wrapper>
    );
  }
}

export default Controls;
