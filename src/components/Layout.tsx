import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Box } from '@mui/material'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box className='flex h-screen bg-gray-50 dark:bg-gray-900'>
    <Sidebar />
    <Box className='flex-1 flex flex-col'>
      <Header />
      <Box className='p-6 overflow-auto flex-1'>{children}</Box>
    </Box>
  </Box>
)

export default Layout
