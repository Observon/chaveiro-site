import { createTheme } from '@mui/material/styles';



// Claudio Chaveiro Theme - Based on navy blue color palette
export const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a5f', // Navy blue from the image
      light: '#4a6fa5',
      dark: '#0f1f3a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f57c00', // Orange accent for buttons and highlights
      light: '#ffad42',
      dark: '#c25e00',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e3a5f',
      secondary: '#64748b',
    },
    emergency: {
      main: '#E53935',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#1e3a5f',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#1e3a5f',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#1e3a5f',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: '#1e3a5f',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0 4px 12px rgba(30, 58, 95, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(30, 58, 95, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
