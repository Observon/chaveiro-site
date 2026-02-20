import React from 'react';
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import Hero from '../../components/Hero/Hero';
import Services from '../../components/Services/Services';
import { Link } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';

const Home: React.FC = () => {
  return (
    <>
      <Hero />

      <Box sx={{ py: { xs: 5, md: 7 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
            Acesso rápido
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
            Escolha o que você precisa agora.
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card elevation={2} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <DirectionsCarIcon color="primary" />
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
                      Catálogo de Chaves
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Veja modelos automotivos e encontre rapidamente a chave ideal para seu veículo.
                  </Typography>
                  <Button component={Link} to="/catalogo" variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                    Ver Catálogo
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card elevation={2} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <BuildIcon color="primary" />
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
                      Nossos Serviços
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Abertura, troca de fechaduras, chave codificada e atendimento especializado 24h.
                  </Typography>
                  <Button component={Link} to="/servicos" variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                    Ver Serviços
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

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
