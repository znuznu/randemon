import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    padding: 0;
    margin: 0;
  }

  html {
    scroll-behavior: smooth;
  }
`;
