import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import { DarkMode, LightMode } from '@mui/icons-material'
import useDarkMode from '@/hooks/useDarkMode'

const Header: React.FC = () => {
  const darkMode = useDarkMode(false)
  return (
    <AppBar position='static' color='transparent' elevation={1} className='shadow-sm'>
      <Toolbar>
        <Typography variant='h6' className='flex-grow'>
          DarkBERT Dashboard
        </Typography>
        <IconButton onClick={darkMode.toggle}>
          {darkMode.value ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
