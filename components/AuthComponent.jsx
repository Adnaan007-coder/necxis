import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Container,
  Paper,
  Fade,
  Slide,
  IconButton,
  Chip
} from '@mui/material';
import {
  Google as GoogleIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider, messaging } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast, { Toaster } from 'react-hot-toast';
import { getToken, onMessage } from 'firebase/messaging';

const AuthComponent = () => {
  const [user, loading] = useAuthState(auth);
  const [fcmToken, setFcmToken] = useState(null);
  const [notificationPermission, setNotificationPermission] = useState('default');

  useEffect(() => {
    // Request notification permission and get FCM token
    const setupFCM = async () => {
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        
        if (permission === 'granted') {
         const messagingInstance = messaging;
          if (messagingInstance) {
            const token = await getToken(messagingInstance, {
              vapidKey: "" 
            });
            setFcmToken(token);
            console.log('FCM Token:', token);
            
            // Listen for foreground messages
            onMessage(messagingInstance, (payload) => {
              toast.success(`📱 ${payload.notification?.title}: ${payload.notification?.body}`, {
                duration: 5000,
                style: {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '12px',
                  padding: '16px'
                }
              });
            });
          }
        }
      } catch (error) {
        console.error('FCM setup error:', error);
        toast.error('Failed to setup notifications');
      }
    };

    if (user) {
      setupFCM();
    }
  }, [user]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success(`🎉 Welcome ${result.user.displayName}!`, {
        duration: 4000,
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '12px',
          padding: '16px'
        }
      });
    } catch (error) {
      toast.error(`❌ Sign-in failed: ${error.message}`, {
        style: {
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          borderRadius: '12px',
          padding: '16px'
        }
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('👋 Signed out successfully!', {
        style: {
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white',
          borderRadius: '12px',
          padding: '16px'
        }
      });
    } catch (error) {
      toast.error('❌ Sign-out failed');
    }
  };

  const sendTestNotification = () => {
    if (notificationPermission === 'granted') {
      toast.success('🔔 Test notification sent!', {
        duration: 3000,
        style: {
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          color: 'white',
          borderRadius: '12px',
          padding: '16px'
        }
      });
    } else {
      toast.error('❌ Notification permission not granted');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="center">
          <Typography variant="h6" color="white">Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Toaster position="top-center" />
      
      {!user ? (
        <Fade in timeout={1000}>
          <Card
            sx={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  margin: '0 auto 24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                <PersonIcon sx={{ fontSize: 40 }} />
              </Avatar>
              
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Welcome Back
              </Typography>
              
              <Typography
                variant="body1"
                sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4 }}
              >
                Sign in to continue to your account
              </Typography>
              
              <Button
                variant="contained"
                size="large"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '12px',
                  padding: '12px 32px',
                  fontSize: '16px',
                  textTransform: 'none',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Sign in with Google
              </Button>
            </CardContent>
          </Card>
        </Fade>
      ) : (
        <Slide direction="down" in timeout={800}>
          <Paper
            sx={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              p: 4
            }}
          >
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar
                src={user.photoURL}
                sx={{ width: 60, height: 60, mr: 2 }}
              />
              <Box>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                  {user.displayName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {user.email}
                </Typography>
              </Box>
            </Box>

            <Box mb={3}>
              <Chip
                icon={<NotificationsIcon />}
                label={`Notifications: ${notificationPermission}`}
                color={notificationPermission === 'granted' ? 'success' : 'warning'}
                sx={{ mr: 1, mb: 1 }}
              />
              {fcmToken && (
                <Chip
                  label="FCM Ready"
                  color="success"
                  sx={{ mb: 1 }}
                />
              )}
            </Box>

            <Box display="flex" gap={2} flexWrap="wrap">
              <Button
                variant="contained"
                startIcon={<NotificationsIcon />}
                onClick={sendTestNotification}
                sx={{
                  background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                  borderRadius: '12px',
                  textTransform: 'none',
                  flex: 1,
                  minWidth: '150px'
                }}
              >
                Test Notification
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={handleSignOut}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  borderRadius: '12px',
                  textTransform: 'none',
                  flex: 1,
                  minWidth: '150px',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    background: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Sign Out
              </Button>
            </Box>
          </Paper>
        </Slide>
      )}
    </Container>
  );
};

export default AuthComponent;