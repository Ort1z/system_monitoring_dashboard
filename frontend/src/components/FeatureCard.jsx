import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

const FeatureCard = ({ icon, title, description }) => (
  <Paper sx={{ 
    p: 3, 
    height: '100%',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)'
    }
  }}>
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      height: '100%'
    }}>
      <Box sx={{
        width: 60,
        height: 60,
        borderRadius: '50%',
        backgroundColor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2
      }}>
        {React.cloneElement(icon, { sx: { fontSize: 30, color: 'white' } })}
      </Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  </Paper>
);

export default FeatureCard;