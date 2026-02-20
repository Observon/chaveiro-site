import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Button, 
  useMediaQuery,
  Card,
  Chip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <LockIcon fontSize="large" color="primary" />,
      title: 'Atendimento 24 Horas',
      description: 'Estamos disponíveis a qualquer hora do dia ou da noite para atender emergências em residências e veículos.'
    },
    {
      icon: <SecurityIcon fontSize="large" color="primary" />,
      title: 'Serviços Residenciais',
      description: 'Abertura de portas, troca de segredos, instalação de fechaduras e muito mais para a segurança da sua casa.'
    },
    {
      icon: <ThumbUpIcon fontSize="large" color="primary" />,
      title: 'Serviços Automotivos',
      description: 'Abertura de veículos, chaves codificadas e reparos de ignição com a máxima agilidade e cuidado.'
    },
    {
      icon: <GroupsIcon fontSize="large" color="primary" />,
      title: 'Atendimento Personalizado',
      description: 'Soluções personalizadas para atender às necessidades específicas de cada cliente.'
    },
    {
      icon: <EmojiEventsIcon fontSize="large" color="primary" />,
      title: 'Qualidade Comprovada',
      description: 'Anos de experiência no mercado, com milhares de clientes satisfeitos em toda a região.'
    },
    {
      icon: <CheckCircleIcon fontSize="large" color="primary" />,
      title: 'Garantia nos Serviços',
      description: 'Trabalhamos com produtos de qualidade e oferecemos garantia em todos os nossos serviços.'
    }
  ];





  return (
    <Box sx={{ py: 0 }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 12,
          mb: 6,
          display: 'flex',
          alignItems: 'center',
          minHeight: '400px'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: isMobile ? '100%' : '70%' }}>
            <Chip 
              label="Sobre Claudio Chaveiro" 
              color="primary" 
              sx={{ 
                mb: 2, 
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                px: 1,
                py: 0.5
              }} 
            />
            <Typography variant="h2" component="h1" gutterBottom sx={{ 
              fontWeight: 700,
              mb: 3,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              color: '#ffffff'
            }}>
              Sua Segurança é o Nosso Compromisso
            </Typography>
            <Typography variant="h5" component="p" sx={{ 
              mb: 4,
              fontWeight: 400,
              textShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }}>
              Atendimento 24h para residências e automóveis em Bonsucesso, Rio de Janeiro e região.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                component={Link}
                to="/contato"
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                  }
                }}
              >
                Fale Conosco
              </Button>
              <Button 
                variant="outlined" 
                color="inherit" 
                size="large"
                component={Link}
                to="/servicos"
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Nossos Serviços
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Our Story */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Sobre Nós
          </Typography>
          <Typography paragraph color="text.secondary" sx={{ mb: 3 }}>
            Claudio Chaveiro é sua referência em serviços de chaveiro em Bonsucesso, Rio de Janeiro. Com anos de experiência, oferecemos um atendimento rápido, confiável e profissional para todas as suas necessidades, seja em casa ou no seu veículo. Nosso compromisso é com a sua segurança e satisfação.
          </Typography>
          <Typography paragraph color="text.secondary">
            Atendemos 24 horas por dia, incluindo feriados, para garantir que você nunca fique desamparado. Nossa equipe está sempre pronta para oferecer a melhor solução com agilidade e os melhores equipamentos do mercado.
          </Typography>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ mb: 12 }}>
          <Box textAlign="center" mb={8}>
            <Chip 
              label="Nossos Diferenciais" 
              color="primary" 
              sx={{ 
                mb: 2, 
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                px: 1.5,
                py: 0.8,
                '& .MuiChip-label': {
                  px: 1
                }
              }} 
            />
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                color: 'text.primary',
                '&::after': {
                  content: '""',
                  display: 'block',
                  width: '80px',
                  height: '4px',
                  backgroundColor: theme.palette.primary.main,
                  margin: '16px auto 0',
                  borderRadius: '2px'
                }
              }}
            >
              Excelência em Serviços de Chaveiro
            </Typography>
            <Typography 
              variant="h6" 
              component="p" 
              color="text.secondary" 
              sx={{ maxWidth: '700px', mx: 'auto', lineHeight: 1.7 }}
            >
              Oferecemos soluções completas e personalizadas para atender todas as suas necessidades de chaveiro com qualidade e eficiência.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
                <Card 
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                      borderColor: 'transparent',
                      backgroundColor: 'background.paper',
                      '& .feature-icon': {
                        transform: 'scale(1.1)'
                      }
                    }
                  }}
                >
                  <Box 
                    className="feature-icon"
                    sx={{ 
                      width: 90, 
                      height: 90, 
                      borderRadius: '50%',
                      bgcolor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      color: 'primary.contrastText',
                      transition: 'all 0.3s ease-in-out',
                      '& svg': {
                        fontSize: '2.5rem'
                      }
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 700,
                      color: 'text.primary',
                      mb: 2
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ lineHeight: 1.7 }}
                  >
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Location Section */}
        <Box sx={{ py: 8 }}>
          <Container maxWidth="lg">
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              gutterBottom 
              sx={{ fontWeight: 700, mb: 6 }}
            >
              Nossa Localização
            </Typography>
            <Card sx={{ p: 2, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
              <iframe 
                title="Localização do Claudio Chaveiro no Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.7678068698014!2d-43.25466497482312!3d-22.86593135716112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997c017e8b3e2b%3A0xe4c2aa38d6d8c018!2sCl%C3%A1udio%20Chaveiro!5e0!3m2!1spt-BR!2sbr!4v1755036310445!5m2!1spt-BR!2sbr"
                width="100%" 
                height="450" 
                style={{ border:0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
              <Typography variant="h6" align="center" sx={{ mt: 2, fontWeight: 'bold' }}>
                Claudio Chaveiro
              </Typography>
              <Typography variant="body1" align="center" color="text.secondary">
                Avenida Praça das Nações 306, Bonsucesso, Rio de Janeiro-RJ
              </Typography>
            </Card>
          </Container>
        </Box>

        {/* Call to Action */}
        <Box 
          sx={{ 
            bgcolor: 'grey.100',
            p: 4,
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="h5" component="h3" gutterBottom>
            Precisa de um chaveiro de confiança?
          </Typography>
          <Typography paragraph sx={{ mb: 3 }}>
            Entre em contato conosco agora mesmo e tenha o melhor atendimento da região.
          </Typography>
          <Box
            component={Link}
            to="/contato"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              padding: '10px 24px',
              borderRadius: '4px',
              textDecoration: 'none',
              display: 'inline-block',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            }}
          >
            Fale Conosco
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
