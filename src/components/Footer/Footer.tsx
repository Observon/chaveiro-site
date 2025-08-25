import React from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 4,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 2 }}>

          {/* Company Info */}
          <Box sx={{ width: { xs: '100%', md: '30%' }, mb: { xs: 3, md: 0 } }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Claudio Chaveiro
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Serviços de chaveiro 24h, residencial e automotivo. Atendimento rápido e profissional em Bonsucesso, Rio de Janeiro-RJ.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box sx={{ width: { xs: '45%', sm: '30%', md: '15%' } }}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Links Rápidos
            </Typography>
            <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink component={RouterLink} to="/" color="text.secondary" underline="hover">Início</MuiLink>
              <MuiLink component={RouterLink} to="/catalogo" color="text.secondary" underline="hover">Catálogo</MuiLink>
              <MuiLink component={RouterLink} to="/servicos" color="text.secondary" underline="hover">Serviços</MuiLink>
              <MuiLink component={RouterLink} to="/sobre" color="text.secondary" underline="hover">Sobre</MuiLink>
              <MuiLink component={RouterLink} to="/contato" color="text.secondary" underline="hover">Contato</MuiLink>
            </Box>
          </Box>

          {/* Contact Info */}
          <Box sx={{ width: { xs: '45%', sm: '30%', md: '20%' } }}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Contato
            </Typography>
            <Box>
              <Typography variant="body2" color="text.secondary" component="div">
                <Box display="flex" alignItems="center" mb={1}>
                  <WhatsAppIcon fontSize="small" sx={{ mr: 1 }} />
                  (21) 99806-3214
                </Box>
                <Box display="flex" alignItems="center" sx={{ wordBreak: 'break-all' }}>
                  luizclaudiochaveiro@gmail.com
                </Box>
              </Typography>
            </Box>
          </Box>

          {/* Social Media */}
          <Box sx={{ width: { xs: '100%', sm: '30%', md: '20%' }, mt: { xs: 3, sm: 0 } }}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Redes Sociais
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <MuiLink href="https://www.instagram.com/_claudiochaveiro" target="_blank" rel="noopener noreferrer" color="inherit">
                <InstagramIcon fontSize="large" />
              </MuiLink>
              <MuiLink href="https://wa.me/5521998063214" target="_blank" rel="noopener noreferrer" color="inherit">
                <WhatsAppIcon fontSize="large" />
              </MuiLink>
            </Box>
          </Box>

        </Box>
        
        {/* Copyright */}
        <Box mt={4} pt={2} borderTop={1} borderColor="divider">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Claudio Chaveiro. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
