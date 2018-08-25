import React from 'react';
import withSideEffect = require('react-side-effect');

interface Props {
  children?: React.ReactChild;
  active: boolean;
  cursor: string;
}

const Cursor: React.SFC<Props> = ({ children }) => {
  if (children) {
    return React.Children.only(children);
  }

  return null;
};

function reducePropsToState(propsList: Props[]) {
  const activeProps = propsList.find(props => props.active);

  if (activeProps) {
    return activeProps.cursor;
  }

  return 'auto';
}

function handleStateChangeOnClient(cursor: string) {
  document.body.style.cursor = cursor;
}

export default withSideEffect<Props, string>(
  reducePropsToState,
  handleStateChangeOnClient,
)(Cursor);
