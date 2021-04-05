import React from 'react';

import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/theme/GlobalStyle';
import { theme } from './styles/theme/theme';

import IndexPage from './pages';
import Footer from './core/components/Footer/Footer';

const Content = styled.div`
  flex: 1 0 auto;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Content>
        <IndexPage />
      </Content>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
