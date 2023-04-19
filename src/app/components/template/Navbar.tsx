import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import TranscribeIcon from '@mui/icons-material/Transcribe';
import {
  Alert,
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useTheme } from '@/providers/ThemeProvider';

interface PageLink {
  name: string;
  link: string;
}

const pages: Array<PageLink> = [{ name: 'Demo', link: 'game' }];

export default function Navbar({ renderAlert }: { renderAlert: boolean }) {
  const { colorMode } = useTheme();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const renderLink = (page: PageLink) => {
    return (
      <Box
        onClick={() => {
          router.push('/' + page.link);
        }}
        key={page.name}
      >
        <MenuItem
          key={page.name}
          sx={{
            my: 2,
            display: 'block',
            color: 'button.text.primary',
          }}
        >
          <Typography textAlign="center">{page.name}</Typography>
        </MenuItem>
      </Box>
    );
    //}
  };

  const renderLogo = () => {
    return (
      <Box
        onClick={() => {
          router.push('/');
        }}
      >
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'button.text.primary',
            textDecoration: 'none',
            ':hover': {
              cursor: 'pointer',
            },
          }}
        >
          Mint Works
        </Typography>
      </Box>
    );
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        padding: '0 !important',
        backgroundColor: 'primary.500',
      }}
    >
      {renderAlert && (
        <Alert
          severity="info"
          style={{
            width: '100%',
          }}
        >
          This is an early development demo for Mint Works Online. If you encounter any unexpected
          issues, please <Link>report them here</Link>.
        </Alert>
      )}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TranscribeIcon
            sx={{ color: 'button.text.primary', display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>{renderLogo()}</Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => renderLink(page))}
            </Menu>
          </Box>
          <TranscribeIcon
            sx={{ color: 'button.text.primary', display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Box sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>{renderLogo()}</Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => renderLink(page))}
          </Box>
          <Box sx={{ marginRight: '12px', display: { xs: 'flex', md: 'flex' } }}>
            <IconButton
              aria-label="toggle colour mode"
              onClick={colorMode?.toggleColorMode}
              style={{
                color: 'white',
              }}
            >
              {colorMode?.currentMode === 'light' ? (
                <DarkModeIcon fontSize="medium" />
              ) : (
                <LightModeIcon fontSize="medium" />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
