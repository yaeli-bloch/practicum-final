import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: "'Varela Round', 'Rubik', 'Assistant', sans-serif",
    h3: {
      fontWeight: 800,
      letterSpacing: '0.5px',
      background: 'linear-gradient(45deg, #FF3D00, #FF9100, #FFEA00)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 2px 10px rgba(255, 152, 0, 0.2)',
    },
    button: {
      fontFamily: "'Varela Round', 'Rubik', 'Assistant', sans-serif",
    }
  },
  palette: {
    primary: {
      main: '#2979FF',
      light: '#82B1FF',
      dark: '#2962FF',
    },
    secondary: {
      main: '#FF4081',
      light: '#FF80AB',
      dark: '#F50057',
    },
    info: {
      main: '#00E5FF',
      light: '#84FFFF',
      dark: '#00B8D4',
    },
    success: {
      main: '#00E676',
      light: '#69F0AE',
      dark: '#00C853',
    },
    warning: {
      main: '#FFAB00',
      light: '#FFD740',
      dark: '#FF6D00',
    },
    background: {
      default: '#F8F9FF',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 20,
  },
});

export default theme;

