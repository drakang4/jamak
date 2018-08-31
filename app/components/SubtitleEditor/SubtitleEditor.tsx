import React, { Component } from 'react';
import TextArea from 'react-textarea-autosize';
import styled from '../../styles/styled-components';
import { Subtitle } from '../../models/subtitle';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10%;
`;

const StyledTextArea = styled(TextArea)`
  background-color: rgba(0, 0, 0, 0.8);
  color: ${props => props.theme.pallete.gray[0]};
  font-size: 24px;
  white-space: normal;
  text-align: justify;
  text-align-last: center;
  resize: none;
  display: block;
  margin: 0 auto;
  padding: 4px 16px;
  border: 0;
  -webkit-appearance: none;
  transition: background-color 0.1s ease-out;

  &:focus {
    background-color: rgba(0, 0, 0, 0.95);
    outline: 1px solid ${props => props.theme.pallete.primary[6]};
  }
`;

interface Props {
  currentIndex: number;
  currentSubtitle: Subtitle | null;
  updateSubtitle({
    index,
    subtitle,
  }: {
    index: number;
    subtitle: Subtitle;
  }): void;
}

class SubtitleEditor extends Component<Props> {
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
    const { currentIndex, currentSubtitle, updateSubtitle } = this.props;

    if (currentIndex !== -1 && currentSubtitle !== null) {
      updateSubtitle({
        index: currentIndex,
        subtitle: {
          startTime: currentSubtitle.startTime,
          endTime: currentSubtitle.endTime,
          texts: event.target.value.split('\n'),
        },
      });
    }
  };

  render() {
    const { currentSubtitle } = this.props;

    if (currentSubtitle) {
      return (
        <Wrapper>
          <StyledTextArea
            cols={42}
            maxRows={2}
            value={currentSubtitle.texts.join('\n')}
            onChange={this.handleChange}
          />
        </Wrapper>
      );
    }

    return null;
  }
}

export default SubtitleEditor;
