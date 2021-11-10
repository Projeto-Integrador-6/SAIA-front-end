import { createTheme } from '@material-ui/core/styles';
import { ptBR } from '@mui/x-data-grid';
import { bgBG as coreBgBG } from '@mui/material/locale';

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
},
  ptBR,
  coreBgBG
);

export default UiTheme;