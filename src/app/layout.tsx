import type { ReactNode } from 'react';
import { Metadata } from 'next';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: '%s | Next JS Starter Kit',
    default: 'Next JS Starter Kit',
  },
  description: 'Create your SSR app with Next JS + Material UI',
};

import defaultTheme from '@/themes/material';

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="pt">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

export default RootLayout;