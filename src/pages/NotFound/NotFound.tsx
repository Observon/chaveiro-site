import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 6, 
            borderRadius: 2,
            backgroundColor: 'background.paper'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <ErrorOutlineIcon 
              sx={{ 
                fontSize: 80, 
                color: 'error.main',
                mb: 2
              }} 
            />
            <Typography variant="h3" component="h1" gutterBottom>
              404
            </Typography>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              sx={{ 
                color: 'text.primary',
                fontWeight: 500,
                mb: 2
              }}
            >
              Página não encontrada
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                maxWidth: '600px',
                mb: 4
              }}
            >
              A página que você está procurando pode ter sido removida, ter mudado de nome ou está temporariamente indisponível.
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="primary" 
              component={RouterLink} 
              to="/"
              size="large"
              sx={{ 
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                textTransform: 'none',
                fontWeight: 'bold'
              }}
            >
              Página Inicial
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              component={RouterLink} 
              to="/contato"
              size="large"
              sx={{ 
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                textTransform: 'none',
                fontWeight: 'bold'
              }}
            >
              Fale Conosco
            </Button>
          </Box>
          
          <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Se você acredita que isso é um erro, por favor entre em contato com nosso suporte.
            </Typography>
            <Button 
              variant="text" 
              color="primary" 
              size="small"
              component={RouterLink}
              to="/contato"
              sx={{ textTransform: 'none' }}
            >
              Suporte Técnico →
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFound;
