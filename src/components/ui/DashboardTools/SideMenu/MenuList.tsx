'use client';

import { useContext } from 'react';
import { usePathname } from 'next/navigation';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';

import Link from '@/components/ui/Link';

import { ToolsContext } from '@/components/ui/DashboardTools/ToolsWrapper';
import type { ToolsContextValueType } from '@/components/ui/DashboardTools/ToolsWrapper';

const items = [
  { name: 'Dash', href: '/dashboard/home', icon: DashboardIcon },
  {
    name: 'Events',
    href: '/dashboard/events',
    icon: EventIcon,
  },
  { name: 'Sellers', href: '/dashboard/sellers', icon: PeopleIcon },
];

const MenuList = () => {
  const pathname = usePathname();
  const [toolsState, setToolsState] = useContext(ToolsContext) as ToolsContextValueType;

  const handleMenuClick = () => {
    setToolsState({
      ...toolsState,
      mobileOpen: false,
    })
  }

  return (
    <>
      {items.map((item) => {
        const MenuIcon = item.icon;

        return (
          <Link style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleMenuClick} href={item.href} key={item.name}>
            <ListItemButton selected={pathname === item.href}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </Link>
        );
      })}
    </>
  )
}

export default MenuList;
