import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const AlertsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Alerts Management
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Alert management content will go here
        </Typography>
      </Paper>
    </Box>
  );
};

export default AlertsPage;