import type { ReactNode } from 'react';
import { auth } from "@/auth"

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { grey } from '@mui/material/colors';

import ToolsWrapper from '@/components/ui/DashboardTools/ToolsWrapper';

interface RootLayoutProps {
  children: ReactNode;
}


const DashboardLayout = async ({ children }: RootLayoutProps) => {
  const session = await auth();

  return (
    <Box sx={{ display: 'flex' }}>
      <ToolsWrapper userName={`${session?.user.first_name} ${session?.user.last_name}`} />
      <Box
        component="main"
        sx={{
          backgroundColor: grey[100],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
          {children}
        </Container>
      </Box>
    </Box>

  );
}

export default DashboardLayout;