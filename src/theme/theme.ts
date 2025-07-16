import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: import.meta.env.VITE_DARK_MODE === 'true' ? 'dark' : 'light'
  }
})

export default theme
