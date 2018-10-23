import * as styledComponents from 'styled-components';
import { ThemeInterface } from './theme';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  withTheme,
  ThemeProvider,
  ThemeConsumer,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  ThemeInterface
>;

export default styled;
export {
  css,
  createGlobalStyle,
  keyframes,
  withTheme,
  ThemeProvider,
  ThemeConsumer,
};
