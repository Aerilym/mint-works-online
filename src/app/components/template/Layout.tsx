'use client';
import { Alert, Box, Container, Fade, Link } from '@mui/material';
import Head from '@/app/components/template/Head';
import Navbar from '@/app/components/template/Navbar';
import ThemeModeProvider from '@/providers/ThemeProvider';

const renderAlert = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeModeProvider>
      <Box>
        <Head />
        <Navbar renderAlert={renderAlert} />

        <Fade in>
          <Container
            style={{
              paddingTop: `calc(6rem  + ${renderAlert ? '4rem' : '0rem'})`,
              paddingBottom: '2rem',
              minHeight: '100vh',
            }}
          >
            {children}
          </Container>
        </Fade>
      </Box>
    </ThemeModeProvider>
  );
}
