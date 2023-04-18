import { ThemeProvider } from '@emotion/react';
import {
  createTheme,
  CssBaseline,
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

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: deepPurple,
          divider: deepPurple[200],
          text: {
            primary: '#212b36',
            secondary: '#637381',
          },
        }
      : {
          // palette values for dark mode
          primary: deepPurple,
          divider: deepPurple[700],
          background: {
            default: '#1c1c1c',
            paper: deepPurple[900],
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
