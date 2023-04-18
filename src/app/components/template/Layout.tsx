'use client';
import { Alert, Box, Container, Fade, Link } from '@mui/material';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Alert
        severity="info"
        style={{
          width: '100%',
          position: 'fixed',
          top: 0,
        }}
      >
        This is an early development demo for Mint Works Online. If you encounter any unexpected
        issues, please <Link>report them here</Link>.
      </Alert>
      <Fade in>
        <Container
          style={{
            paddingTop: '6rem',
            paddingBottom: '2rem',
            minHeight: '100vh',
          }}
        >
          {children}
        </Container>
      </Fade>
    </Box>
  );
}
