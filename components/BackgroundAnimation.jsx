import React from 'react';
import { Box, keyframes } from '@mui/material';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-30px) rotate(120deg); }
  66% { transform: translateY(30px) rotate(240deg); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 0.4; }
`;

const BackgroundAnimation = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe)',
        backgroundSize: '400% 400%',
        animation: `${gradient} 15s ease infinite`,
        overflow: 'hidden'
      }}
    >
      {/* Floating Elements */}
      {[...Array(12)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            backdropFilter: 'blur(10px)',
            borderRadius: '50%',
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `${float} ${Math.random() * 10 + 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        />
      ))}

      {/* Geometric Shapes */}
      {[...Array(8)].map((_, i) => (
        <Box
          key={`shape-${i}`}
          sx={{
            position: 'absolute',
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(135deg, 
              rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1),
              rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.05)
            )`,
            clipPath: i % 3 === 0
              ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
              : i % 3 === 1
                ? 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                : 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            animation: `${pulse} ${Math.random() * 8 + 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}

      {/* Grid Pattern Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: `${pulse} 20s ease-in-out infinite`
        }}
      />
    </Box>
  );
};

export default BackgroundAnimation;