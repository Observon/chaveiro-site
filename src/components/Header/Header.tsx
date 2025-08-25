import React from 'react';
import { AppBar, Toolbar, Button, Box, Container, useTheme, useMediaQuery } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface NavLink {
  path: string;
  label: string;
  external?: boolean;
}

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const navLinks: NavLink[] = [
    { path: '/', label: 'Início' },
    { path: '/catalogo', label: 'Catálogo' },
    { path: '/servicos', label: 'Serviços' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/contato', label: 'Contato' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: 'white', py: 2 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              component={RouterLink} 
              to="/" 
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                mr: 4 
              }}
            >
              <img src="/images/logos/logov2.1.png" alt="Claudio Chaveiro Logo" style={{ height: '50px' }} />
            </Box>

            {/* Navigation Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    color: isActive(link.path) ? 'primary.main' : 'text.primary',
                    fontWeight: isActive(link.path) ? 'bold' : 'normal',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          </Box>

          {/* WhatsApp Button */}
          <Button
            variant="contained"
            color="success"
            startIcon={isMobile ? null : <WhatsAppIcon />}
            href="https://wa.me/5521998063214"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              backgroundColor: '#25D366',
              '&:hover': {
                backgroundColor: '#128C7E',
              },
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: 2,
              px: { xs: 1.5, md: 3 },
              py: 1,
              minWidth: { xs: 'auto', md: 'auto' }
            }}
          >
            {isMobile ? <WhatsAppIcon /> : 'Chamar no WhatsApp'}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
