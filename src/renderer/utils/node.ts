import { findDOMNode } from 'react-dom';

export const getElementNode = (
  instance: React.ReactInstance | null,
): Element | null => {
  if (instance === null) {
    return null;
  }

  const node = findDOMNode(instance);

  if (!(node instanceof Element)) {
    return null;
  }

  return node;
};
