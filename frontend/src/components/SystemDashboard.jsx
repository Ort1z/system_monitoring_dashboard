import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { 
  Box, Grid, Paper, Typography, CircularProgress, 
  IconButton, Tooltip, ToggleButton, ToggleButtonGroup
} from '@mui/material';
import { 
  Timeline, BarChart, PieChart, RadarChart, 
  SettingsVoice, ArOn, AiOutlineRobot 
} from '@mui/icons-material';
import { Chart } from 'react-google-charts';
import useWebSocket from 'react-use-websocket';
import AnomalyDetectionPanel from './AnomalyDetectionPanel';
import VoiceCommandDialog from './VoiceCommandDialog';
import ARButton from './ARButton';

const SystemDashboard = () => {
  const theme = useTheme();
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('standard');
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [anomalies, setAnomalies] = useState([]);
  
  const { lastMessage } = useWebSocket('ws://localhost:5000/api/realtime');
  
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/metrics');
        const data = await response.json();
        setMetrics(data);
        
        const anomalyResponse = await fetch('/api/ai/anomalies');
        const anomalyData = await anomalyResponse.json();
        setAnomalies(anomalyData);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (lastMessage !== null) {
      const newData = JSON.parse(lastMessage.data);
      setMetrics(prev => [newData, ...prev.slice(0, 99)]);
    }
  }, [lastMessage]);
  
  const cpuData = [
    ['Time', 'CPU Usage'],
    ...metrics.filter(m => m.name === 'cpu_usage').map(m => [
      new Date(m.timestamp), 
      m.value
    ])
  ];
  
  const memoryData = [
    ['Time', 'Memory Usage'],
    ...metrics.filter(m => m.name === 'memory_usage').map(m => [
      new Date(m.timestamp), 
      m.value
    ])
  ];
  
  const resourceDistribution = [
    ['Resource', 'Usage'],
    ['CPU', metrics.find(m => m.name === 'cpu_usage')?.value || 0],
    ['Memory', metrics.find(m => m.name === 'memory_usage')?.value || 0],
    ['Disk', metrics.find(m => m.name === 'disk_usage')?.value || 0],
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h4" component="h1">
          System Dashboard
        </Typography>
        
        <Box>
          <Tooltip title="Voice Commands">
            <IconButton 
              onClick={() => setVoiceOpen(true)}
              sx={{ 
                mr: 1,
                backgroundColor: voiceOpen ? theme.palette.primary.main : 'transparent'
              }}
            >
              <SettingsVoice />
            </IconButton>
          </Tooltip>
          
          <ARButton />
          
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(e, newMode) => newMode && setViewMode(newMode)}
            sx={{ ml: 2 }}
          >
            <ToggleButton value="standard">
              <Timeline />
            </ToggleButton>
            <ToggleButton value="ai">
              <AiOutlineRobot />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      
      {viewMode === 'ai' && (
        <AnomalyDetectionPanel anomalies={anomalies} />
      )}
      
      <Grid container spacing={3}>
        {/* CPU Usage */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              CPU Usage
            </Typography>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Chart
                chartType="LineChart"
                data={cpuData}
                options={{
                  hAxis: { title: 'Time' },
                  vAxis: { title: 'Usage %', minValue: 0, maxValue: 100 },
                  curveType: 'function',
                  legend: { position: 'none' },
                  colors: [theme.palette.primary.main],
                  backgroundColor: 'transparent',
                }}
                width="100%"
                height="300px"
              />
            )}
          </Paper>
        </Grid>
        
        {/* Memory Usage */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Memory Usage
            </Typography>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Chart
                chartType="LineChart"
                data={memoryData}
                options={{
                  hAxis: { title: 'Time' },
                  vAxis: { title: 'Usage %', minValue: 0, maxValue: 100 },
                  curveType: 'function',
                  legend: { position: 'none' },
                  colors: [theme.palette.secondary.main],
                  backgroundColor: 'transparent',
                }}
                width="100%"
                height="300px"
              />
            )}
          </Paper>
        </Grid>
        
        {/* Resource Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '300px' }}>
            <Typography variant="h6" gutterBottom>
              Resource Distribution
            </Typography>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Chart
                chartType="PieChart"
                data={resourceDistribution}
                options={{
                  pieHole: 0.4,
                  is3D: true,
                  colors: [
                    theme.palette.primary.main,
                    theme.palette.secondary.main,
                    '#9c27b0'
                  ],
                  backgroundColor: 'transparent',
                  legend: { position: 'labeled' },
                }}
                width="100%"
                height="250px"
              />
            )}
          </Paper>
        </Grid>
        
        {/* Anomaly Detection */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '300px' }}>
            <Typography variant="h6" gutterBottom>
              AI Anomaly Detection
            </Typography>
            {anomalies.length > 0 ? (
              <Box>
                {anomalies.map((anomaly, index) => (
                  <Box key={index} sx={{ 
                    mb: 1, 
                    p: 1, 
                    borderRadius: 1,
                    backgroundColor: 
                      anomaly.severity === 'Critical' ? '#ff1744' :
                      anomaly.severity === 'High' ? '#ff9100' :
                      '#ffea00'
                  }}>
                    <Typography>
                      {anomaly.metric} anomaly detected: {anomaly.value} at {new Date(anomaly.timestamp).toLocaleTimeString()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '80%',
                flexDirection: 'column'
              }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  No anomalies detected
                </Typography>
                <AiOutlineRobot style={{ fontSize: '3rem', color: theme.palette.primary.main }} />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      <VoiceCommandDialog open={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </Box>
  );
};

export default SystemDashboard;