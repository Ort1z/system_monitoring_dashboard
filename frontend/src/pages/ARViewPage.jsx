import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Paper, 
  CircularProgress, Alert, IconButton
} from '@mui/material';
import { ArOn, Close } from '@mui/icons-material';

const ARViewPage = ({ onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [arSession, setArSession] = useState(null);
  
  useEffect(() => {
    const initAR = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setArSession({
          start: () => console.log('AR session started'),
          end: () => console.log('AR session ended')
        });
        setLoading(false);
      } catch (err) {
        console.error('AR initialization failed:', err);
        setError('Failed to initialize AR. Please try again or check browser compatibility.');
        setLoading(false);
      }
    };
    
    initAR();
    
    return () => {
      if (arSession) {
        arSession.end();
      }
    };
  }, []);
  
  const startARExperience = () => {
    if (arSession) {
      arSession.start();
    }
  };

  return (
    <Paper sx={{ 
      position: 'relative',
      height: '100%',
      p: 2,
      overflow: 'hidden'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2
      }}>
        <Typography variant="h5" component="h2">
          Augmented Reality View
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      
      {loading ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60vh'
        }}>
          <CircularProgress size={60} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Initializing AR environment...
          </Typography>
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      ) : (
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60vh',
          border: '2px dashed',
          borderColor: 'divider',
          borderRadius: 1,
          backgroundColor: 'background.default'
        }}>
          <ArOn sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
          <Typography variant="body1" sx={{ mb: 3 }}>
            Point your device at your server rack or workstation to see live metrics
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            startIcon={<ArOn />}
            onClick={startARExperience}
          >
            Start AR Experience
          </Button>
        </Box>
      )}
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          How to use:
        </Typography>
        <Typography variant="body2" paragraph>
          1. Grant camera permissions when prompted
        </Typography>
        <Typography variant="body2" paragraph>
          2. Point your device at your server rack or workstation
        </Typography>
        <Typography variant="body2" paragraph>
          3. View real-time metrics overlaid on your physical infrastructure
        </Typography>
      </Box>
    </Paper>
  );
};

export default ARViewPage;