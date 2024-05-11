'use client';

import { createContext, useContext, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import AppBar from "@/components/ui/DashboardTools/TopBar";
import SideMenu from "@/components/ui/DashboardTools/SideMenu/SideMenu";

interface ToolsWrapperProps {
  userName: string;
}

interface ToolsContextDataType {
  drawerWidth: number;
  userName: string;
  isClosing: boolean;
  mobileOpen: boolean,
}

export type ToolsContextValueType = [ToolsContextDataType, Dispatch<SetStateAction<ToolsContextDataType>>]

const drawerWidth = 240;
export const ToolsContext = createContext<ToolsContextValueType | null>(null);



const ToolsWrapper = ({ userName }: ToolsWrapperProps) => {
  const initialToolsState = {
    drawerWidth,
    userName,
    isClosing: false,
    mobileOpen: false,
  }

  const [toolsState, setToolsState] = useState<ToolsContextDataType>(initialToolsState);

  return (
    <ToolsContext.Provider value={[toolsState, setToolsState]}>
      <AppBar />
      <SideMenu />
    </ToolsContext.Provider>
  )
}

export default ToolsWrapper;