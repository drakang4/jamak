import React, { createRef, Component } from 'react';
import { FastLayer, Arc } from 'react-konva';
import { ThemeConsumer } from '../../styles/styled-components';
import SizeContext from '../Timeline/SizeContext';
import Konva from 'konva';

class Loading extends Component {
  indicator = createRef<Konva.Arc>();

  componentDidMount() {
    const indicator = this.indicator.current;

    if (indicator) {
      const animation = new Konva.Animation(frame => {
        const theta = frame.lastTime / 10000;
        indicator.rotate(theta);
      }, indicator.getLayer());

      animation.start();
    }
  }

  render() {
    return (
      <FastLayer>
        <SizeContext.Consumer>
          {size => (
            <ThemeConsumer>
              {theme => (
                <Arc
                  ref={this.indicator}
                  angle={270}
                  innerRadius={16}
                  outerRadius={20}
                  x={size.width / 2}
                  y={size.height / 1.5 + 16}
                  fill={theme.pallete.primary[6]}
                />
              )}
            </ThemeConsumer>
          )}
        </SizeContext.Consumer>
      </FastLayer>
    );
  }
}
export default Loading;
