'use client';

import { Roboto } from 'next/font/google';

import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';


const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const getMaterialTheme = (): ThemeOptions => {
  return {
    palette: { 
      mode: 'light'
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
    }
  }
}

const materialTheme = createTheme(getMaterialTheme());

export default materialTheme;