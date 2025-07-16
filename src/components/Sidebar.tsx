import React from 'react'
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import { Dashboard as DashboardIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const Sidebar: React.FC = () => (
  <Drawer variant='permanent' className='w-60' PaperProps={{ className: 'w-60' }}>
    <Toolbar />
    <List>
      <ListItemButton component={Link} to='/'>
        <ListItemIcon><DashboardIcon /></ListItemIcon>
        <ListItemText primary='Overview' />
      </ListItemButton>
    </List>
  </Drawer>
)

export default Sidebar
