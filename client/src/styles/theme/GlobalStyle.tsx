import { createGlobalStyle } from 'styled-components';

import OpenSans from '../fonts/open-sans-v18-latin-regular.woff';
import OpenSans2 from '../fonts/open-sans-v18-latin-regular.woff2';

import Lato from '../fonts/lato-v17-latin-regular.woff';
import Lato2 from '../fonts/lato-v17-latin-regular.woff2';

import PermanentMarker from '../fonts/permanent-marker-v10-latin-regular.woff';
import PermanentMarker2 from '../fonts/permanent-marker-v10-latin-regular.woff2';

import LuckiestGuy from '../fonts/luckiest-guy-v11-latin-regular.woff';
import LuckiestGuy2 from '../fonts/luckiest-guy-v11-latin-regular.woff2';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    padding: 0;
    margin: 0;
    height: 100%;
    overflow-x: hidden;
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
    font-family: 'Lato';
    font-display: fallback;
    src: local('Lato'), local('Lato'),
    url(${Lato2}) format('woff2'),
    url(${Lato}) format('woff');
    font-style: normal;
    font-display: fallback;
  }

  @font-face {
    font-family: 'PermanentMarker';
    font-display: fallback;
    src: local('PermanentMarker'), local('PermanentMarker'),
    url(${PermanentMarker2}) format('woff2'),
    url(${PermanentMarker}) format('woff');
    font-style: normal;
    font-display: fallback;
  }

  @font-face {
    font-family: 'LuckiestGuy';
    font-display: fallback;
    src: local('LuckiestGuy'), local('LuckiestGuy'),
    url(${LuckiestGuy2}) format('woff2'),
    url(${LuckiestGuy}) format('woff');
    font-style: normal;
    font-display: fallback;
  }
`;

export default GlobalStyle;
