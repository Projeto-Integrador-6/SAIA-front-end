import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import { AuthProvider } from './contexts/AuthContext';
import { NavProvider } from './contexts/NavContext';
import { SnackProvider } from './contexts/SnackContext';

import Routes from './routes';

import UiTheme from './theme';

import './global.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={UiTheme}>
      <SnackProvider>
        <AuthProvider>
          <NavProvider>
            <Routes />
          </NavProvider>
        </AuthProvider>
      </SnackProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

