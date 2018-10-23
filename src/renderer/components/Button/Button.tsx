import React from 'react';
import styled from '../../styles/styled-components';

const StyledButton = styled.button`
  display: inline-flex;
  box-sizing: border-box;
  border: 0;
  border-radius: 24px;
  font-size: 1rem;
  padding: 12px 16px;
  margin-bottom: 16px;
  margin-right: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.pallete.gray[0]};
  color: ${props => props.theme.pallete.gray[9]};
  transition: background-color 0.2s ease-out, box-shadow 0.2s ease-out;

  &:hover {
    background-color: ${props => props.theme.pallete.gray[2]};
    box-shadow: 0 0 0 2px ${props => props.theme.pallete.primary[2]};
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${props => props.theme.pallete.primary[5]};
  }

  &:active {
    background-color: ${props => props.theme.pallete.gray[4]};
  }
`;

const AccentButton = styled(StyledButton)`
  background-color: ${props => props.theme.pallete.primary[6]};
  color: ${props => props.theme.pallete.gray[0]};

  &:hover {
    background-color: ${props => props.theme.pallete.primary[4]};
    box-shadow: 0 0 0 2px ${props => props.theme.pallete.primary[2]};
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${props => props.theme.pallete.primary[5]};
  }

  &:active {
    background-color: ${props => props.theme.pallete.primary[9]};
  }
`;

const DisabledButton = styled(StyledButton)`
  background-color: transparent;
  border: 2px solid ${props => props.theme.pallete.gray[6]};
  color: ${props => props.theme.pallete.gray[6]};

  &:hover {
    background-color: transparent;
    box-shadow: none;
  }

  &:focus {
    outline: 0;
    box-shadow: none;
  }

  &:active {
    background-color: transparent;
  }
`;

interface Props {
  children?: React.ReactChild;
  accent?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
}

const Button: React.StatelessComponent<Props> = ({
  children,
  accent,
  disabled,
  onClick,
  ...props
}) => {
  const ButtonComponent = disabled
    ? DisabledButton
    : accent
      ? AccentButton
      : StyledButton;

  return (
    <ButtonComponent disabled={disabled} onClick={onClick} {...props}>
      {children}
    </ButtonComponent>
  );
};

Button.defaultProps = {
  accent: false,
  disabled: false,
};

export default Button;
