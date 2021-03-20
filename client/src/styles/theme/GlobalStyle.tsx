import { createGlobalStyle } from 'styled-components';

import OpenSans from '../fonts/open-sans-v18-latin-regular.woff';
import OpenSans2 from '../fonts/open-sans-v18-latin-regular.woff2';

import Inter from '../fonts/inter-v3-latin-regular.woff';
import Inter2 from '../fonts/inter-v3-latin-regular.woff2';

import KaBlam from '../fonts/ka-blam.ttf';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    padding: 0;
    margin: 0;
  }

  @font-face {
    font-family: 'OpenSans';
    src: local('OpenSans'), local('OpenSans'),
    url(${OpenSans2}) format('woff2'),
    url(${OpenSans}) format('woff');
    font-style: normal;
  }

  @font-face {
    font-family: 'Inter';
    src: local('Inter'), local('Inter'),
    url(${Inter2}) format('woff2'),
    url(${Inter}) format('woff');
    font-style: normal;
  }

  @font-face {
    font-family: 'KaBlam';
    src: local('KaBlam'), local('KaBlam'),
    url(${KaBlam}) format('woff2');
    font-style: normal;
  }
`;

export default GlobalStyle;
