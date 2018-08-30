import React, { PureComponent } from 'react';
import SizeContext from './SizeContext';

export interface SizeProps {
  width: number;
  height: number;
  zoomMultiple: number;
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

const withSize = <P extends SizeProps>(
  WrappedComponent: React.ComponentType<P>,
) =>
  class WithSize extends PureComponent<Subtract<P, SizeProps>> {
    render() {
      return (
        <SizeContext.Consumer>
          {size => <WrappedComponent {...this.props} {...size} />}
        </SizeContext.Consumer>
      );
    }
  };

export default withSize;
