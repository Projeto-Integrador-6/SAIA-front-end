import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@material-ui/styles';

import Home from './pages/Home';
import Login from './pages/Login';

import UiTheme from './theme';

import './global.css';


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={UiTheme}>
      <Login />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

