import React from 'react';

function MetricsList({ metrics }) {
  return (
    <div>
      <h2>Metrics</h2>
      <ul>
        {metrics.map(metric => (
          <li key={metric.id}>{metric.type}: {metric.value} {metric.unit}</li>
        ))}
      </ul>
    </div>
  );
}

export default MetricsList;
