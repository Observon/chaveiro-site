import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Alert, 
  AlertTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    'Abertura de Portas',
    'Troca de Fechaduras',
    'Cópias de Chaves',
    'Chaveiro Automotivo',
    'Outro Serviço'
  ];

  const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }> | { target: { name?: string; value: unknown } }) => {
    const { name, value } = e.target as { name?: string; value: unknown };
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as string]) {
      setErrors(prev => ({
        ...prev,
        [name as string]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.service) newErrors.service = 'Selecione um serviço';
    if (!formData.message.trim()) newErrors.message = 'Mensagem é obrigatória';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    }
  };

  const contactInfo = [
    { 
      icon: <PhoneIcon fontSize="large" color="primary" />, 
      title: 'Telefone',
      content: '(21) 99806-3214', // Placeholder number
      href: 'https://wa.me/5521998063214' // TODO: Add correct WhatsApp number
    },
    { 
      icon: <EmailIcon fontSize="large" color="primary" />, 
      title: 'Email', 
      content: 'luizclaudiochaveiro@gmail.com',
      href: 'mailto:luizclaudiochaveiro@gmail.com'
    },
    { 
      icon: <LocationOnIcon fontSize="large" color="primary" />, 
      title: 'Endereço', 
      content: 'Avenida Praça das Nações 306, Bonsucesso, Rio de Janeiro-RJ',
      href: 'https://www.google.com/maps/search/?api=1&query=Avenida+Praça+das+Nações+306+Bonsucesso+Rio+de+Janeiro'
    },
    { 
      icon: <ScheduleIcon fontSize="large" color="primary" />, 
      title: 'Horário de Atendimento', 
      content: '24 horas por dia, 7 dias por semana',
      href: ''
    }
  ];

  return (
    <Box sx={{ py: 6, backgroundColor: '#f9f9f9', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
          Entre em Contato
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Estamos prontos para ajudar com qualquer necessidade de chaveiro. Fale conosco!
        </Typography>

        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
          {/* Contact Form */}
          <Box flex={{ md: 2 }} width="100%">
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              {isSubmitted ? (
                <Alert severity="success" sx={{ mb: 3 }}>
                  <AlertTitle>Enviado com Sucesso!</AlertTitle>
                  Sua mensagem foi enviada. Entraremos em contato em breve.
                </Alert>
              ) : (
              <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={3}>
                  <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={3}>
                    <TextField
                      fullWidth
                      label="Nome"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      variant="outlined"
                    />
                  </Box>
                  <TextField
                    fullWidth
                    label="Telefone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    variant="outlined"
                  />
                  <FormControl fullWidth variant="outlined" error={!!errors.service}>
                    <InputLabel>Serviço Desejado</InputLabel>
                    <Select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      label="Serviço Desejado"
                    >
                      <MenuItem value="" disabled>
                        *Selecione um serviço*
                      </MenuItem>
                      {services.map((service, index) => (
                        <MenuItem key={index} value={service}>
                          {service}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.service && (
                      <FormHelperText>{errors.service}</FormHelperText>
                    )}
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Mensagem"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    variant="outlined"
                    multiline
                    rows={5}
                  />
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    fullWidth
                    sx={{ py: 1.5, fontSize: '1.1rem' }}
                  >
                    Enviar Mensagem
                  </Button>
                </Box>
              </form>
              )}
            </Paper>
          </Box>

          {/* Contact Information */}
          <Box flex={{ md: 1 }} width="100%">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {contactInfo.map((item, index) => (
                <Paper 
                  key={index} 
                  elevation={3} 
                  sx={{ 
                    p: 3, 
                    height: '100%',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ mr: 2 }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h6" component="h3" color="primary">
                      {item.title}
                    </Typography>
                  </Box>
                  {item.href ? (
                    <Box 
                      component="a"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'block',
                        '&:hover': {
                          textDecoration: 'underline',
                        }
                      }}
                    >
                      {item.content}
                    </Box>
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      {item.content}
                    </Typography>
                  )}
                </Paper>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Map */}
        <Box sx={{ mt: 6, borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.7678068698014!2d-43.25466497482312!3d-22.86593135716112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997c017e8b3e2b%3A0xe4c2aa38d6d8c018!2sCl%C3%A1udio%20Chaveiro!5e0!3m2!1spt-BR!2sbr!4v1755036310445!5m2!1spt-BR!2sbr"
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            title="Localização de Claudio Chaveiro"
          ></iframe>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
