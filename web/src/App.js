import React from 'react';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #fafafa;
    -webkit-font-smoothing: antialiased;
  }
`;

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Header />
    <Routes />
  </BrowserRouter>
);

export default App;
