import { createGlobalStyle } from './styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${props => props.theme.pallete.gray[8]};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.pallete.gray[6]};
  }
`;

export default GlobalStyle;
