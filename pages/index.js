import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import AuthComponent from '../components/AuthComponent';
import BackgroundAnimation from '../components/BackgroundAnimation';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <BackgroundAnimation />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            My Auth App
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              textShadow: '0 1px 5px rgba(0,0,0,0.3)'
            }}
          >
            Secure authentication with Google Sign-In & Firebase notifications
          </Typography>
        </Box>
        
        <AuthComponent />
      </Container>
    </Box>
  );
}