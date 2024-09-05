import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [metrics, setMetrics] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [systems, setSystems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metricsResponse = await axios.get('http://localhost:5000/api/metrics');
        setMetrics(metricsResponse.data);

        const alertsResponse = await axios.get('http://localhost:5000/api/alerts');
        setAlerts(alertsResponse.data);

        const systemsResponse = await axios.get('http://localhost:5000/api/systems');
        setSystems(systemsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>System Monitoring Dashboard</h1>
      
      <h2>Systems</h2>
      <ul>
        {systems.map(system => (
          <li key={system.id}>{system.name} - {system.type}</li>
        ))}
      </ul>

      <h2>Metrics</h2>
      <ul>
        {metrics.map(metric => (
          <li key={metric.id}>
            {metric.type}: {metric.value} {metric.unit} 
            (System ID: {metric.system_id}, Time: {new Date(metric.timestamp).toLocaleString()})
          </li>
        ))}
      </ul>

      <h2>Alerts</h2>
      <ul>
        {alerts.map(alert => (
          <li key={alert.id}>
            {alert.condition} {alert.threshold} - {alert.severity} - {alert.status}
            (System ID: {alert.system_id}, Metric ID: {alert.metric_id})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

