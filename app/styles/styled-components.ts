import * as styledComponents from 'styled-components';
import { ThemeInterface } from './theme';

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  withTheme,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  ThemeInterface
>;

export default styled;
export { css, injectGlobal, keyframes, withTheme, ThemeProvider };
