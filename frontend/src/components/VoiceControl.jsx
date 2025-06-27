import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, 
  DialogActions, Button, Typography, 
  List, ListItem, ListItemIcon, ListItemText,
  IconButton, CircularProgress, Chip
} from '@mui/material';
import { 
  SettingsVoice, MicOff, CheckCircle, 
  ErrorOutline, HelpOutline 
} from '@mui/icons-material';

const VoiceControl = ({ open, onClose }) => {
  const [listening, setListening] = useState(false);
  const [commands, setCommands] = useState([]);
  const [permission, setPermission] = useState(null);
  const [recognition, setRecognition] = useState(null);
  
  const supportedCommands = [
    { command: 'show CPU usage', action: 'Navigate to CPU view' },
    { command: 'show memory', action: 'Navigate to Memory view' },
    { command: 'create alert for high CPU', action: 'Open alert creation dialog' },
    { command: 'switch to dark mode', action: 'Toggle dark/light theme' },
    { command: 'show anomalies', action: 'Navigate to AI insights' },
    { command: 'refresh data', action: 'Reload all metrics' },
  ];

  useEffect(() => {
    if (open && !recognition) {
      initSpeechRecognition();
    }
    
    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [open]);
  
  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setPermission('unsupported');
      return;
    }
    
    const recognizer = new SpeechRecognition();
    recognizer.continuous = true;
    recognizer.interimResults = true;
    recognizer.lang = 'en-US';
    
    recognizer.onstart = () => {
      setListening(true);
      setPermission('granted');
    };
    
    recognizer.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setListening(false);
      
      if (event.error === 'not-allowed') {
        setPermission('denied');
      }
    };
    
    recognizer.onend = () => {
      setListening(false);
    };
    
    recognizer.onresult = (event) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript.trim();
      
      if (event.results[last].isFinal) {
        setCommands(prev => [...prev, {
          text,
          timestamp: new Date(),
          processed: false
        }]);
        
        processCommand(text);
      }
    };
    
    setRecognition(recognizer);
  };
  
  const processCommand = (command) => {
    console.log('Processing command:', command);
    setCommands(prev => prev.map(cmd => 
      cmd.text === command ? { ...cmd, processed: true } : cmd
    ));
  };
  
  const startListening = () => {
    if (recognition) {
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
  };
  
  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };
  
  const requestPermission = () => {
    startListening();
    setTimeout(stopListening, 100);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        <SettingsVoice sx={{ mr: 1 }} />
        Voice Control
        <Chip 
          label={listening ? 'Listening...' : 'Ready'} 
          color={listening ? 'success' : 'default'}
          size="small"
          sx={{ ml: 2 }}
        />
      </DialogTitle>
      
      <DialogContent dividers>
        {permission === 'unsupported' ? (
          <Typography color="error">
            Your browser doesn't support speech recognition. Try Chrome or Edge.
          </Typography>
        ) : permission === 'denied' ? (
          <Box>
            <Typography color="error" gutterBottom>
              Microphone access was denied. Please allow microphone access in your browser settings.
            </Typography>
            <Button 
              variant="contained" 
              onClick={requestPermission}
              startIcon={<SettingsVoice />}
            >
              Request Microphone Access
            </Button>
          </Box>
        ) : (
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Available Commands
              </Typography>
              <List dense sx={{ maxHeight: 200, overflow: 'auto' }}>
                {supportedCommands.map((cmd, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <HelpOutline color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`"${cmd.command}"`}
                      secondary={cmd.action}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Command History
              </Typography>
              {commands.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No commands yet. Try saying "show CPU usage"
                </Typography>
              ) : (
                <List dense sx={{ maxHeight: 200, overflow: 'auto' }}>
                  {commands.map((cmd, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        {cmd.processed ? (
                          <CheckCircle color="success" />
                        ) : (
                          <CircularProgress size={24} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={cmd.text}
                        secondary={cmd.timestamp.toLocaleTimeString()}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        {permission === 'granted' && (
          <Button
            variant="contained"
            color={listening ? 'error' : 'primary'}
            startIcon={listening ? <MicOff /> : <SettingsVoice />}
            onClick={listening ? stopListening : startListening}
          >
            {listening ? 'Stop Listening' : 'Start Listening'}
          </Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default VoiceControl;