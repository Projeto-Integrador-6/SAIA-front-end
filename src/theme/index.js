import { createTheme } from '@material-ui/core/styles';

const UiTheme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif'
    ].join(','),
    fontWeight: 400,
  },
  palette: {
    background: {
      default: '#F1F1F1',
    },
    primary: {
      light: '#68D99C',
      main: '#3AB874',
      dark: '#1D9956',
      contrastText: '#FFFFFF',
    },
    error: {
      light: '#E57373',
      main: '#F44336',
      dark: '#D32D2F',
      contrastText: '#FFFFFF'
    }
  },
});

export default UiTheme;