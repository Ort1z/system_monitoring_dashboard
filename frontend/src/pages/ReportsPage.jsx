import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ReportsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Reports
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Report generation content will go here
        </Typography>
      </Paper>
    </Box>
  );
};

export default ReportsPage;