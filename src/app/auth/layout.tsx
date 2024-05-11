import type { ReactNode } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Copyright from '@/components/ui/Copyright';

interface RootLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: RootLayoutProps) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        
        {children}
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

export default AuthLayout;