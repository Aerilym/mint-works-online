import { ThemeProvider } from '@emotion/react';
import {
  createTheme,
  CssBaseline,
  PaletteColorOptions,
  PaletteMode,
  responsiveFontSizes,
  ThemeOptions,
} from '@mui/material';
import { deepPurple, grey } from '@mui/material/colors';
import { createContext, useContext, useMemo, useState } from 'react';

type ContextProps = {
  colorMode: {
    toggleColorMode: () => void;
    currentMode: PaletteMode;
  };
};

const ColorModeContext = createContext<Partial<ContextProps>>({});

const MintWorksPrimary: PaletteColorOptions = {
  50: '#e3eee5',
  100: '#bbd6bf',
  200: '#91bb96',
  300: '#65a36e',
  400: '#449251',
  500: '#1c8134',
  600: '#15742c',
  700: '#096423',
  800: '#005419',
  900: '#003707',
};

const MintWorksComplementary: PaletteColorOptions = {
  50: '#eee4ec',
  100: '#d6bcd2',
  200: '#bb91b5',
  300: '#a4669c',
  400: '#96458d',
  500: '#87267e',
  600: '#7b2278',
  700: '#6c1b71',
  800: '#5e1569',
  900: '#450b5b',
};

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: MintWorksPrimary,
          divider: MintWorksPrimary[200],
          text: {
            primary: '#212b36',
            secondary: '#637381',
          },
          mintCard: {
            background: '#f2e9d9',
            textPrimary: '#1f3a42',
            textSecondary: '#f6eed8',
            border: '#5e5e5e',
            deed: '#9cb8ae',
            utility: '#f1b158',
            production: '#e17975',
            culture: '#b6c16c',
          },
        }
      : {
          // palette values for dark mode
          primary: MintWorksPrimary,
          divider: MintWorksPrimary[700],
          background: {
            default: '#1c1c1c',
            paper: grey[900],
          },
          text: {
            primary: '#ededed',
            secondary: grey[500],
          },
        }),
  },
  typography: {
    fontFamily: 'Poppins,sans-serif',
    h1: {
      fontFamily: 'Barlow,sans-serif',
      fontSize: '4rem',
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h2: {
      fontFamily: 'Barlow,sans-serif',
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
  },
});

export default function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('light');
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      currentMode: mode,
    }),
    [mode]
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={{ colorMode }}>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ColorModeContext);
};
