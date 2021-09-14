import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@material-ui/styles';

import Routes from './routes';

import UiTheme from './theme';

import './global.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={UiTheme}>
      <Routes />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

