import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  TextField,
  InputAdornment,
  Chip,
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price: string;
  featured?: boolean;
  tags: string[];
}

const Services: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Todos os Serviços' },
    { id: 'residencial', name: 'Residencial' },
    { id: 'comercial', name: 'Comercial' },
    { id: 'automotivo', name: 'Automotivo' },
    { id: 'seguranca', name: 'Segurança' },
  ];

  const services: Service[] = [
    {
      id: 1,
      title: 'Abertura de Portas',
      description: 'Serviço especializado em abertura de portas residenciais e comerciais sem danificar a fechadura.',
      image: 'https://images.unsplash.com/photo-1600891964098-9b5a4b237b67?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'residencial',
      price: 'A partir de R$ 120,00',
      featured: true,
      tags: ['24h', 'Emergência', 'Sem Danos']
    },
    {
      id: 2,
      title: 'Troca de Fechaduras',
      description: 'Substituição de fechaduras antigas por modelos modernos com maior segurança.',
      image: 'https://images.unsplash.com/photo-1584917865158-27f0f9b24ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'residencial',
      price: 'A partir de R$ 80,00',
      tags: ['Instalação', 'Manutenção']
    },
    {
      id: 3,
      title: 'Cópias de Chaves',
      description: 'Cópia de chaves comuns, codificadas e especiais com alta precisão.',
      image: 'https://images.unsplash.com/photo-1584917934197-8480731ccf80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'residencial',
      price: 'A partir de R$ 15,00',
      tags: ['Rápido', 'Preciso']
    },
    {
      id: 4,
      title: 'Chaveiro Automotivo',
      description: 'Abertura de veículos, confecção de chaves codificadas e reparos em geral.',
      image: 'https://images.unsplash.com/photo-1591768793355-74d04bb9908d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'automotivo',
      price: 'A partir de R$ 150,00',
      featured: true,
      tags: ['Carros', 'Motos', 'Caminhões']
    },
    {
      id: 5,
      title: 'Segurança Patrimonial',
      description: 'Instalação de fechaduras de segurança, trincos e acessórios de proteção.',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'seguranca',
      price: 'Sob Consulta',
      tags: ['Segurança', 'Proteção']
    },
    {
      id: 6,
      title: 'Serviço para Empresas',
      description: 'Soluções completas em chaveiro para estabelecimentos comerciais e empresas.',
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'comercial',
      price: 'Sob Consulta',
      tags: ['Comercial', 'Empresas']
    },
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredServices = services.filter(service => service.featured);

  return (
    <Box sx={{ py: 6, backgroundColor: '#f9f9f9' }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            Nossos Serviços
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth="800px" mx="auto">
            Oferecemos soluções completas em serviços de chaveiro 24 horas para residências, empresas e veículos.
          </Typography>
        </Box>

        {/* Search and Filter */}
        <Box mb={6} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar serviços..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map(category => (
              <Chip
                key={category.id}
                label={category.name}
                onClick={() => setSelectedCategory(category.id)}
                color={selectedCategory === category.id ? 'primary' : 'default'}
                variant={selectedCategory === category.id ? 'filled' : 'outlined'}
                sx={{ 
                  flexShrink: 0,
                  '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: 'action.hover',
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Featured Services */}
        {!searchTerm && selectedCategory === 'all' && (
          <Box mb={6}>
            <Typography variant="h5" component="h2" gutterBottom>
              Serviços em Destaque
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {featuredServices.map((service) => (
                <Grid key={`featured-${service.id}`} size={{ xs: 12, md: 6 }}>
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      height: '100%',
                      overflow: 'hidden',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6,
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: { xs: '100%', sm: '40%' },
                        height: { xs: '200px', sm: 'auto' },
                        backgroundImage: `url(${service.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0,0,0,0.2)'
                        }
                      }}
                    >
                      <Chip 
                        label="Destaque" 
                        color="primary" 
                        size="small" 
                        sx={{ 
                          position: 'absolute', 
                          top: 16, 
                          right: 16, 
                          zIndex: 1,
                          fontWeight: 'bold'
                        }} 
                      />
                    </Box>
                    <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                        {service.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Typography variant="subtitle2" color="primary" fontWeight="bold">
                          {service.price}
                        </Typography>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          size="small"
                          component={Link}
                          to={`/contato?service=${encodeURIComponent(service.title)}`}
                        >
                          Solicitar Orçamento
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* All Services */}
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {searchTerm || selectedCategory !== 'all' ? 'Resultados' : 'Todos os Serviços'}
          </Typography>
          
          {filteredServices.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Nenhum serviço encontrado com os critérios de busca.
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                sx={{ mt: 2 }}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Limpar Filtros
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredServices.map((service) => (
                <Grid key={service.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6,
                      }
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        height: 180,
                        backgroundImage: `url(${service.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                      }}
                    >
                      <Box sx={{ 
                        position: 'absolute', 
                        top: 8, 
                        right: 8, 
                        display: 'flex',
                        gap: 1 
                      }}>
                        {service.tags.map((tag, index) => (
                          <Chip 
                            key={index} 
                            label={tag} 
                            size="small" 
                            sx={{ 
                              backgroundColor: 'rgba(0,0,0,0.7)',
                              color: 'white',
                              fontSize: '0.6rem',
                              height: '20px'
                            }} 
                          />
                        ))}
                      </Box>
                    </CardMedia>
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                        {service.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                        <Typography variant="subtitle2" color="primary" fontWeight="bold">
                          {service.price}
                        </Typography>
                        <Button 
                          variant="outlined" 
                          color="primary" 
                          size="small"
                          component={Link}
                          to={`/contato?service=${encodeURIComponent(service.title)}`}
                        >
                          Solicitar
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Call to Action */}
        <Box 
          sx={{ 
            mt: 8, 
            p: 4, 
            backgroundColor: theme.palette.primary.main, 
            color: 'white',
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Não encontrou o que procurava?
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: '700px', mx: 'auto', mb: 3 }}>
            Entre em contato conosco e faça um orçamento personalizado para sua necessidade.
            Nossa equipe está pronta para ajudar com soluções sob medida para você.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            component={Link}
            to="/contato"
            sx={{ 
              px: 4, 
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
              }
            }}
          >
            Fale Conosco
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
