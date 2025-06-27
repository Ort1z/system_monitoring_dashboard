import React from 'react';
import { Button } from '@mui/material';
import { ArOn } from '@mui/icons-material';

const ARButton = () => {
  return (
    <Button
      variant="outlined"
      startIcon={<ArOn />}
      href="/ar-view"
      sx={{
        mr: 1,
        textTransform: 'none'
      }}
    >
      AR View
    </Button>
  );
};

export default ARButton;