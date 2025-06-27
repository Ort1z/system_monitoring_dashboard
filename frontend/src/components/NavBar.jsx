import React from 'react';
import { 
  AppBar, Toolbar, Typography, Button, 
  IconButton, Switch, Box, Avatar 
} from '@mui/material';
import { 
  SettingsVoice, ArOn, 
  LightMode, DarkMode 
} from '@mui/icons-material';

const NavBar = ({ darkMode, setDarkMode, voiceActive, setVoiceActive, arSupported }) => {
  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: 'background.paper' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          System Monitor
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            color="inherit"
            onClick={() => setVoiceActive(!voiceActive)}
            sx={{ 
              backgroundColor: voiceActive ? 'primary.main' : 'transparent'
            }}
          >
            <SettingsVoice />
          </IconButton>
          
          {arSupported && (
            <IconButton color="inherit" href="/ar-view">
              <ArOn />
            </IconButton>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LightMode fontSize="small" />
            <Switch 
              checked={darkMode} 
              onChange={() => setDarkMode(!darkMode)} 
              color="primary"
            />
            <DarkMode fontSize="small" />
          </Box>
          
          <Avatar 
            sx={{ width: 32, height: 32, ml: 2 }}
            src="/path/to/user-avatar.jpg"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;