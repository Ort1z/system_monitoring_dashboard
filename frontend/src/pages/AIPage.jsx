import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const AIPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        AI Insights
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          AI-powered insights and recommendations will go here
        </Typography>
      </Paper>
    </Box>
  );
};

export default AIPage;