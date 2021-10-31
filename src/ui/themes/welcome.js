import { createTheme } from '@mui/material/styles';

const welcomeTheme = createTheme({
  typography: {
    fontFamily: '"Public Sans", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
      marginBottom: 10,
    },
    h3: {
      fontSize: '1.5rem',
      marginTop: 20,
      marginBottom: 20,
    }
  },
  palette: {
    mode: 'dark',
  },
});

export default welcomeTheme;
