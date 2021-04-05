import { createGlobalStyle } from 'styled-components';

import OpenSans from '../fonts/open-sans-v18-latin-regular.woff';
import OpenSans2 from '../fonts/open-sans-v18-latin-regular.woff2';

import Inter from '../fonts/inter-v3-latin-regular.woff';
import Inter2 from '../fonts/inter-v3-latin-regular.woff2';

import Lato from '../fonts/lato-v17-latin-regular.woff';
import Lato2 from '../fonts/lato-v17-latin-regular.woff2';

import KaBlam from '../fonts/ka-blam.ttf';

// FIXME: issue with flickering due to the inject remade
const GlobalStyle = createGlobalStyle`
  html, body, #root {
    padding: 0;
    margin: 0;
    height: 100%;
  }

  #root {
    display: flex;
    flex-direction: column;
  }

  @font-face {
    font-family: 'OpenSans';
    font-style: normal;
    font-display: fallback;
    src: local('OpenSans'), local('OpenSans'),
    url(${OpenSans2}) format('woff2'),
    url(${OpenSans}) format('woff');
  }

  @font-face {
    font-family: 'Inter';
    font-display: fallback;
    src: local('Inter'), local('Inter'),
    url(${Inter2}) format('woff2'),
    url(${Inter}) format('woff');
    font-style: normal;
    font-display: fallback;
  }  
  
  @font-face {
    font-family: 'Lato';
    font-display: fallback;
    src: local('Lato'), local('Lato'),
    url(${Lato2}) format('woff2'),
    url(${Lato}) format('woff');
    font-style: normal;
    font-display: fallback;
  }

  @font-face {
    font-family: 'KaBlam';
    font-display: fallback;
    src: local('KaBlam'), local('KaBlam'),
    url(${KaBlam}) format('woff2');
    font-style: normal;
    font-display: fallback;
  }
`;

export default GlobalStyle;
