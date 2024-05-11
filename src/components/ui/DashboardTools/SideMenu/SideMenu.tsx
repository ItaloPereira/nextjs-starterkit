'use client';

import Image from 'next/image'
import { styled } from '@mui/material/styles';
import { useState, useContext } from 'react';


import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import MenuList from './MenuList';

import { ToolsContext } from '@/components/ui/DashboardTools/ToolsWrapper';
import type { ToolsContextValueType } from '@/components/ui/DashboardTools/ToolsWrapper';

const SideMenu = () => {
  const [toolsState, setToolsState] = useContext(ToolsContext) as ToolsContextValueType;

  const handleDrawerTransitionEnd = () => {
    setToolsState({ 
      ...toolsState,
      isClosing: false,
    });
  };

  const handleDrawerClose = () => {
    setToolsState({ 
      ...toolsState,
      mobileOpen: false,
      isClosing: true,
    });
  };

  const DrawerContent = () => (
    <>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: [1],
        }}
      >
        <Image
          src="/images/your-logo.png"
          width={150}
          height={34}
          alt="your logo"
          priority
        />
      </Toolbar>
      <Divider />
      <List component="nav">
        <MenuList />
      </List>
    </>
  )

  return (
    <Box
      component="nav"
      sx={{ width: { sm: toolsState.drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="side menu"
    >
      <Drawer
        variant="temporary"
        open={toolsState.mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: toolsState.drawerWidth },
        }}
      >
        <DrawerContent />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: toolsState.drawerWidth },
        }}
        open
      >
        <DrawerContent />
      </Drawer>
    </Box>
  )
}

export default SideMenu;