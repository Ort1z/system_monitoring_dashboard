import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AlertsPage from './pages/AlertsPage';
import ReportsPage from './pages/ReportsPage';
import AIPage from './pages/AIPage';
import ARViewPage from './pages/ARViewPage';
import VoiceControl from './components/VoiceControl';
import NavBar from './components/NavBar';
import './styles/global.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00f5d4',
    },
    secondary: {
      main: '#f15bb5',
    },
    background: {
      default: '#0a0a12',
      paper: '#161622',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      background: 'linear-gradient(45deg, #00f5d4 30%, #f15bb5 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          padding: '12px 24px',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [voiceActive, setVoiceActive] = useState(false);
  const [arSupported, setArSupported] = useState(false);
  
  useEffect(() => {
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-ar').then(setArSupported);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app-container">
          <VoiceControl active={voiceActive} setActive={setVoiceActive} />
          <NavBar 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
            voiceActive={voiceActive}
            setVoiceActive={setVoiceActive}
            arSupported={arSupported}
          />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/ai-insights" element={<AIPage />} />
            {arSupported && <Route path="/ar-view" element={<ARViewPage />} />}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;