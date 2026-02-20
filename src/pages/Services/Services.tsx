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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  useTheme
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

type ServiceQuestionnaire = {
  [key: string]: string;
};

const buildServiceWhatsAppMessage = (serviceTitle: string, questionnaire: ServiceQuestionnaire): string => {
  const answers: string[] = [];

  Object.entries(questionnaire).forEach(([key, value]) => {
    if (value && value.trim()) {
      answers.push(`• ${value}`);
    }
  });

  const message = [
    `Olá! Gostaria de solicitar orçamento para: ${serviceTitle}`,
    '',
    answers.length > 0 ? 'Informações fornecidas:' : 'Detalhes a informar no atendimento.',
    ...answers,
    '',
    'Posso enviar fotos se necessário.',
  ].join('\n');

  return `https://wa.me/5521998063214?text=${encodeURIComponent(message)}`;
};

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [questionnaire, setQuestionnaire] = useState<ServiceQuestionnaire>({});

  const handleRequestQuote = (service: Service) => {
    setSelectedService(service);
    setQuestionnaire({});
    setQuoteDialogOpen(true);
  };

  const handleCloseQuoteDialog = () => {
    setQuoteDialogOpen(false);
    setSelectedService(null);
    setQuestionnaire({});
  };

  const handleQuestionnaireChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuestionnaire((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSendQuoteRequest = () => {
    if (!selectedService) return;
    const whatsappUrl = buildServiceWhatsAppMessage(selectedService.title, questionnaire);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    handleCloseQuoteDialog();
  };

  const renderQuestionnaireFields = () => {
    if (!selectedService) return null;
    const title = selectedService.title.toLowerCase();

    if (title.includes('abertura de portas') && !title.includes('veículos')) {
      return (
        <Stack spacing={2}>
          <TextField fullWidth label="Marca/Modelo da fechadura (opcional)" placeholder="Ex.: Pauma, Cilíndrica" value={questionnaire['lockBrand'] || ''} onChange={handleQuestionnaireChange('lockBrand')} />
          <TextField fullWidth label="Tipo de porta (madeira, metal, alumínio)" value={questionnaire['doorType'] || ''} onChange={handleQuestionnaireChange('doorType')} />
          <TextField fullWidth label="Local (opcional)" placeholder="Ex.: Vila Mariana" value={questionnaire['location'] || ''} onChange={handleQuestionnaireChange('location')} />
        </Stack>
      );
    } else if (title.includes('abertura de veículos')) {
      return (
        <Stack spacing={2}>
          <TextField fullWidth label="Marca" placeholder="Ex.: Ford" value={questionnaire['vehicleBrand'] || ''} onChange={handleQuestionnaireChange('vehicleBrand')} />
          <TextField fullWidth label="Modelo" placeholder="Ex.: Fiesta" value={questionnaire['vehicleModel'] || ''} onChange={handleQuestionnaireChange('vehicleModel')} />
          <TextField fullWidth label="Ano" placeholder="Ex.: 2018" value={questionnaire['vehicleYear'] || ''} onChange={handleQuestionnaireChange('vehicleYear')} />
          <TextField fullWidth label="Local" value={questionnaire['location'] || ''} onChange={handleQuestionnaireChange('location')} />
          <TextField fullWidth label="Veículo blindado? / Bateria / Fechadura funciona?" multiline minRows={2} placeholder="Sim/Não/Não sei" value={questionnaire['details'] || ''} onChange={handleQuestionnaireChange('details')} />
        </Stack>
      );
    } else if (title.includes('trava tetra')) {
      return (
        <Stack spacing={2}>
          <TextField fullWidth label="Material da porta (ferro, madeira, alumínio)" value={questionnaire['doorMaterial'] || ''} onChange={handleQuestionnaireChange('doorMaterial')} />
          <TextField fullWidth label="Local" value={questionnaire['location'] || ''} onChange={handleQuestionnaireChange('location')} />
        </Stack>
      );
    } else if (title.includes('controle') && title.includes('portão')) {
      return (
        <Stack spacing={2}>
          <TextField fullWidth label="Marca do motor (Garen, Rossi, Mega, etc)" value={questionnaire['gateMotor'] || ''} onChange={handleQuestionnaireChange('gateMotor')} />
          <TextField fullWidth label="Possuo controle antigo?" placeholder="Sim/Não" value={questionnaire['details'] || ''} onChange={handleQuestionnaireChange('details')} />
        </Stack>
      );
    } else if (title.includes('empresa')) {
      return (
        <Stack spacing={2}>
          <TextField fullWidth label="Nome da empresa (opcional)" value={questionnaire['company'] || ''} onChange={handleQuestionnaireChange('company')} />
          <TextField fullWidth multiline minRows={3} label="Que serviços você precisa?" placeholder="Ex.: Troca de fechaduras, cópias de chaves, manutenção" value={questionnaire['scope'] || ''} onChange={handleQuestionnaireChange('scope')} />
          <TextField fullWidth label="Necessita visita no local?" placeholder="Sim/Não" value={questionnaire['visit'] || ''} onChange={handleQuestionnaireChange('visit')} />
        </Stack>
      );
    }
    return (
      <TextField fullWidth multiline minRows={4} label="Informações adicionais (opcional)" value={questionnaire['notes'] || ''} onChange={handleQuestionnaireChange('notes')} />
    );
  };

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
      description: 'Abertura profissional de portas residenciais. Marca/modelo fechadura, tipo de porta e local influenciam no preço.',
      image: 'https://images.unsplash.com/photo-1600891964098-9b5a4b237b67?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'residencial',
      price: 'A partir de R$ 120,00',
      featured: true,
      tags: ['24h', 'Emergência', 'Sem Danos']
    },
    {
      id: 2,
      title: 'Abertura de Veículos',
      description: 'Abertura de carros, motos e caminhões sem danificar a fechadura. Avaliamos marca, modelo, ano e localização.',
      image: 'https://images.unsplash.com/photo-1591768793355-74d04bb9908d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'automotivo',
      price: 'A partir de R$ 150,00',
      featured: true,
      tags: ['Carros', 'Motos', 'Caminhões']
    },
    {
      id: 3,
      title: 'Instalação de Fechaduras',
      description: 'Instalação profissional de fechaduras de segurança em residências e comerciais.',
      image: 'https://images.unsplash.com/photo-1584917865158-27f0f9b24ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'residencial',
      price: 'A partir de R$ 80,00',
      tags: ['Instalação', 'Segurança']
    },
    {
      id: 4,
      title: 'Instalação de Trava Tetra de Segurança',
      description: 'Instalação de trava adicional para aumentar segurança. Perguntamos material da porta (ferro, madeira, alumínio).',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'seguranca',
      price: 'A partir de R$ 150,00',
      tags: ['Segurança', 'Auxiliar']
    },
    {
      id: 5,
      title: 'Cópia de Chave Yale (simples)',
      description: 'Cópia precisa de chaves yale com máquinas de alto padrão.',
      image: 'https://images.unsplash.com/photo-1584917934197-8480731ccf80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'residencial',
      price: 'A partir de R$ 15,00',
      tags: ['Rápido', 'Preciso']
    },
    {
      id: 6,
      title: 'Cópia de Chave Tetra',
      description: 'Cópia de chaves tetra com precisão e rapidez.',
      image: 'https://images.unsplash.com/photo-1584917934197-8480731ccf80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'residencial',
      price: 'A partir de R$ 20,00',
      tags: ['Rápido', 'Tetra']
    },
    {
      id: 7,
      title: 'Cópia de Chave Gorja',
      description: 'Cópia especializada de chaves tipo Gorja com máquinas apropriadas.',
      image: 'https://images.unsplash.com/photo-1584917934197-8480731ccf80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'residencial',
      price: 'A partir de R$ 18,00',
      tags: ['Especializada']
    },
    {
      id: 8,
      title: 'Cópia de Chave Porta de Aço',
      description: 'Cópia precisa para portas de aço e tipos especiais.',
      image: 'https://images.unsplash.com/photo-1584917934197-8480731ccf80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'residencial',
      price: 'A partir de R$ 25,00',
      tags: ['Especializada', 'Porta Aço']
    },
    {
      id: 9,
      title: 'Cópia de Tag 125kHz e 13.56MHz',
      description: 'Cópia de tags RFID para sistemas de acesso eletrônico.',
      image: 'https://images.unsplash.com/photo-1584917934197-8480731ccf80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'comercial',
      price: 'A partir de R$ 30,00',
      tags: ['Eletrônico', 'RFID']
    },
    {
      id: 10,
      title: 'Controles para Portão de Garagem',
      description: 'Programação e cópia de controles. Precisamos saber a marca do motor (Garen, Rossi, Mega, etc).',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'residencial',
      price: 'A partir de R$ 80,00',
      tags: ['Portão', 'Controle']
    },
    {
      id: 11,
      title: 'Consultoria de Segurança',
      description: 'Análise profissional da segurança do local com recomendações personalizadas.',
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'comercial',
      price: 'Sob Consulta',
      tags: ['Consultoria', 'Análise']
    },
    {
      id: 12,
      title: 'Serviço para Empresas',
      description: 'Soluções completas em chaveiro para estabelecimentos. Oferecemos visita no local para orçamento personalizado.',
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: 'comercial',
      price: 'Sob Consulta',
      featured: true,
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
                          onClick={() => handleRequestQuote(service)}
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
                          onClick={() => handleRequestQuote(service)}
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
            onClick={() => handleRequestQuote({ title: 'Orçamento Personalizado para Empresas', id: 999, category: 'comercial', description: '', image: '', price: '', tags: [] })}
            sx={{ 
              px: 4, 
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
              }
            }}
          >
            Solicitar Orçamento Personalizado
          </Button>
        </Box>
      </Container>

      <Dialog open={quoteDialogOpen} onClose={handleCloseQuoteDialog} fullWidth maxWidth="sm">
        <DialogTitle>Informações para Orçamento - {selectedService?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, pt: 1 }}>
            Preencha as informações abaixo (campos opcionais ajudam a agilizar).
          </Typography>
          {renderQuestionnaireFields()}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseQuoteDialog} variant="text">Cancelar</Button>
          <Button
            onClick={handleSendQuoteRequest}
            variant="contained"
            color="success"
            startIcon={<WhatsAppIcon />}
          >
            Solicitar via WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Services;
