import React from 'react';
import { Box, Button, Container, Typography, Grid } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        py: { xs: 10, md: 15 },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#1e3a5f',//'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        },
      }}
      style={{
        backgroundImage: 'url(/images/hero-bg.jpg)', // need to add this image
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
                mb: 3,
                color: '#ffffff'
              }}
            >
              Chaveiro 24h - Residencial e Automotivo
            </Typography>
            
            <Typography 
              variant="h5" 
              component="p" 
              sx={{ 
                mb: 4,
                maxWidth: '600px',
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Atendimento rápido, onde você estiver. Abrimos portas, consertamos fechaduras e fazemos chaves codificadas!
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="emergency"
                size="large"
                startIcon={<PhoneIcon />}
                href="tel:+5521998063214"
                sx={{
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                Ligar Agora
              </Button>
              
              <Button
                variant="contained"
                color="success"
                size="large"
                startIcon={<WhatsAppIcon />}
                href="https://wa.me/5521998063214"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  backgroundColor: '#25D366',
                  '&:hover': {
                    backgroundColor: '#128C7E',
                  },
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                Chamar no WhatsApp
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
