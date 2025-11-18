import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, createTheme, CssBaseline, responsiveFontSizes } from '@mui/material'

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0ea5e9', dark: '#0284c7' },
    secondary: { main: '#14b8a6' },
    background: { default: '#f8fafc', paper: '#ffffff' }
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: `'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`,
    h4: { fontWeight: 700 },
    h6: { fontWeight: 700 }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: '0 6px 20px rgba(2,132,199,0.15)' }
      }
    }
  }
})
theme = responsiveFontSizes(theme)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
