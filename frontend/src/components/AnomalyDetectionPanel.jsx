import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, LinearProgress, 
  Paper, Chip, Alert, Collapse, IconButton
} from '@mui/material';
import { 
  AiOutlineRobot, AiOutlineWarning, 
  AiOutlineClose, AiOutlineBulb 
} from 'react-icons/ai';

const AnomalyDetectionPanel = ({ anomalies }) => {
  const [expanded, setExpanded] = useState(true);
  const [insights, setInsights] = useState([]);
  const [loadingInsights, setLoadingInsights] = useState(false);
  
  const fetchInsights = async () => {
    setLoadingInsights(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockInsights = [
        "CPU spikes are occurring every 2 hours, likely due to scheduled cron jobs.",
        "Memory usage is consistently high between 2-4PM when daily reports are generated.",
        "Disk I/O shows unusual patterns on Tuesdays when backup scripts run."
      ];
      setInsights(mockInsights);
    } catch (error) {
      console.error("Error fetching insights:", error);
    } finally {
      setLoadingInsights(false);
    }
  };
  
  const severityColor = (severity) => {
    switch(severity) {
      case 'Critical': return 'error';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      default: return 'success';
    }
  };

  return (
    <Paper sx={{ mb: 3, p: 2, backgroundColor: 'background.paper' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AiOutlineRobot size={24} style={{ marginRight: 8 }} />
          <Typography variant="h6">AI Insights & Anomalies</Typography>
        </Box>
        <IconButton onClick={() => setExpanded(!expanded)}>
          {expanded ? <AiOutlineClose /> : <AiOutlineBulb />}
        </IconButton>
      </Box>
      
      <Collapse in={expanded}>
        {anomalies.length > 0 ? (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Recent Anomalies Detected
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1,
              mb: 2
            }}>
              {anomalies.slice(0, 5).map((anomaly, index) => (
                <Chip
                  key={index}
                  label={`${anomaly.metric}: ${anomaly.value}`}
                  color={severityColor(anomaly.severity)}
                  variant="outlined"
                  icon={<AiOutlineWarning />}
                />
              ))}
            </Box>
          </Box>
        ) : (
          <Alert severity="success" sx={{ mb: 2 }}>
            No critical anomalies detected in the last 24 hours.
          </Alert>
        )}
        
        <Typography variant="subtitle1" gutterBottom>
          Predictive Insights
        </Typography>
        
        {loadingInsights ? (
          <LinearProgress sx={{ my: 2 }} />
        ) : insights.length > 0 ? (
          <Box sx={{ 
            backgroundColor: 'background.default',
            borderRadius: 1,
            p: 2,
            mb: 2
          }}>
            {insights.map((insight, index) => (
              <Box key={index} sx={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                mb: 1
              }}>
                <AiOutlineBulb style={{ 
                  marginRight: 8, 
                  color: '#00f5d4',
                  flexShrink: 0,
                  marginTop: 2
                }} />
                <Typography variant="body2">{insight}</Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Alert severity="info" sx={{ mb: 2 }}>
            No predictive insights available. Click below to analyze.
          </Alert>
        )}
        
        <Button 
          variant="contained" 
          startIcon={<AiOutlineRobot />}
          onClick={fetchInsights}
          disabled={loadingInsights}
        >
          {loadingInsights ? 'Analyzing...' : 'Run Predictive Analysis'}
        </Button>
      </Collapse>
    </Paper>
  );
};

export default AnomalyDetectionPanel;