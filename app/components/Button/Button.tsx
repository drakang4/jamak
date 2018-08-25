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
`;

const AccentButton = styled(StyledButton)`
  background-color: ${props => props.theme.pallete.primary[6]};
  color: ${props => props.theme.pallete.gray[0]};
`;

const DisabledButton = styled(StyledButton)`
  background-color: transparent;
  border: 2px solid ${props => props.theme.pallete.gray[6]};
  color: ${props => props.theme.pallete.gray[6]};
`;

interface IProps {
  children?: React.ReactChild;
  accent?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
}

const Button: React.StatelessComponent<IProps> = ({
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
