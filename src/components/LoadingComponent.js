import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

const LoadingComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full screen height
        backgroundColor: '#f5f5f5', // Light background color
        color: '#555', // Subtle text color
      }}
    >
      <CircularProgress
        size={80}
        thickness={4}
        sx={{
          color: '#3f51b5', // Custom color for the spinner
          marginBottom: '20px',
        }}
      />
      <Typography variant="h6" sx={{ fontWeight: '400' }}>
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default LoadingComponent;
