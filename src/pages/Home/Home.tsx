import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Hero from '../../components/Hero/Hero';
import Services from '../../components/Services/Services';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      
      {/* Call to Action Section */}
      <Box sx={{ py: 8, bgcolor: 'primary.main', color: 'white' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Precisa de uma chave para seu veículo?
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
            Confira nosso catálogo de chaves automotivas e encontre a solução ideal para o seu carro.
          </Typography>
          <Button
            component={Link}
            to="/catalogo"
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 2,
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: 'secondary.dark',
              },
            }}
          >
            Ver Catálogo de Chaves
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default Home;
