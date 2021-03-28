import React from 'react';

import { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/theme/GlobalStyle';
import { theme } from './styles/theme/theme';

import IndexPage from './pages';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <IndexPage />
    </ThemeProvider>
  );
}

export default App;
