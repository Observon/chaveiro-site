import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockClockIcon from '@mui/icons-material/LockClock';
import BuildIcon from '@mui/icons-material/Build';
import { styled } from '@mui/material/styles';

const ServiceCard = styled(Card)(({ theme }) => ({
  height: '110%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const ServiceIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: '3rem',
    color: theme.palette.primary.main,
  },
}));

const services = [
  {
    title: 'Abertura de Portas',
    icon: <LockOpenIcon />,
    description: 'Serviço profissional para abertura de portas residenciais, comerciais e veículos.',
  },
  {
    title: 'Troca de Fechaduras',
    icon: <LockIcon />,
    description: 'Substituição e instalação de fechaduras com os melhores materiais do mercado.',
  },
  {
    title: 'Chave Codificada',
    icon: <VpnKeyIcon />,
    description: 'Cópia de chaves codificadas para veículos com tecnologia de ponta.',
  },
  {
    title: 'Abertura de Veículos',
    icon: <DirectionsCarIcon />,
    description: 'Atendimento especializado para abertura de carros, motos e caminhões.',
  },
  {
    title: 'Fechaduras Digitais',
    icon: <LockClockIcon />,
    description: 'Instalação e manutenção de fechaduras digitais e inteligentes.',
  },
  {
    title: 'Conserto de Ignição',
    icon: <BuildIcon />,
    description: 'Conserto e substituição de sistemas de ignição para todos os modelos de veículos.',
  },
];

const Services: React.FC = () => {
  return (
    <Box id="services" sx={{ py: 8, bgcolor: /*'background.paper'*/ '#e2ed0c' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            mb: 6,
            position: 'relative',
            '&::after': {
              content: '""',
              display: 'block',
              width: '80px',
              height: '4px',
              backgroundColor: 'primary.main',
              margin: '20px auto 0',
              borderRadius: '2px',
            },
          }}
        >
          Nossos Serviços
        </Typography>
        
        <Grid container spacing={5}>
          {services.map((service, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <ServiceCard elevation={3}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <ServiceIcon>
                    {service.icon}
                  </ServiceIcon>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
