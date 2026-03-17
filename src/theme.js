import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3d8fa6',
      light: '#5ab3cc',
      dark: '#1e5568',
      contrastText: '#e8d4b8',
    },
    secondary: {
      main: '#c4894a',
      light: '#d4a255',
      contrastText: '#e8d4b8',
    },
    background: {
      default: '#0c1920',
      paper: '#122130',
    },
    text: {
      primary: '#e8d4b8',
      secondary: '#9eb6c4',
      disabled: '#4a6a7c',
    },
    divider: '#1e3a50',
    error: { main: '#d45a4a' },
    success: { main: '#4a9e7a' },
  },
  typography: {
    fontFamily: "'Raleway', sans-serif",
    h1: { fontFamily: "'Cinzel', serif" },
    h2: { fontFamily: "'Cinzel', serif" },
    h3: { fontFamily: "'Cinzel', serif" },
    h4: { fontFamily: "'Cinzel', serif" },
    h5: { fontFamily: "'Cinzel', serif" },
    h6: { fontFamily: "'Cinzel', serif" },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #0a1520 0%, #122130 100%)',
          borderBottom: '1px solid #1e3a50',
          boxShadow: '0 2px 20px rgba(0,0,0,0.5)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Raleway', sans-serif",
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontSize: '0.72rem',
          borderRadius: '6px',
          transition: 'all 0.25s ease',
        },
        text: {
          color: '#9eb6c4',
          '&:hover': { color: '#e8d4b8', background: 'rgba(61,143,166,0.12)' },
          '&.active': { color: '#c4894a' },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: "'Raleway', sans-serif",
          background: 'rgba(18,33,48,0.8)',
          borderRadius: '8px',
          '& fieldset': { borderColor: '#1e3a50' },
          '&:hover fieldset': { borderColor: '#3d8fa6 !important' },
          '&.Mui-focused fieldset': { borderColor: '#c4894a !important', borderWidth: '1px' },
        },
        input: { color: '#e8d4b8', '&::placeholder': { color: '#4a6a7c', opacity: 1 } },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: { background: '#c4894a', color: '#0c1920', fontWeight: 700, fontSize: '0.65rem' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#122130',
          border: '1px solid #1e3a50',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        },
      },
    },
  },
})
