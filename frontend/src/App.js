import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MetricsList from './components/MetricsList';

function App() {
  const [metrics, setMetrics] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get('/api/metrics').then(response => setMetrics(response.data));
    axios.get('/api/alerts').then(response => setAlerts(response.data));
  }, []);

  return (
    <div className="App">
      <h1>System Monitoring Dashboard</h1>
      <MetricsList metrics={metrics} />
      <div>
        <h2>Alerts</h2>
        <ul>
          {alerts.map(alert => (
            <li key={alert.id}>
              {alert.condition} {alert.threshold} - {alert.severity} - {alert.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

