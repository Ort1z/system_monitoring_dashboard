# backend/app.py
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from prometheus_client import start_http_server, Counter, Gauge
import time
import logging
from prometheus_integration import PrometheusManager
from grafana_integration import GrafanaManager

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///monitor.db'
db = SQLAlchemy(app)

# Prometheus metrics
REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP Requests')
CPU_USAGE = Gauge('system_cpu_usage', 'Current CPU usage percentage')
MEMORY_USAGE = Gauge('system_memory_usage', 'Current memory usage percentage')

# Initialize monitoring integrations
prometheus = PrometheusManager()
grafana = GrafanaManager()

# Models
class System(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(200))
    ip_address = db.Column(db.String(15))
    type = db.Column(db.String(50))  # Server, Application, Network Device
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class Metric(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    system_id = db.Column(db.Integer, db.ForeignKey('system.id'))
    name = db.Column(db.String(100))
    value = db.Column(db.Float))
    unit = db.Column(db.String(20))
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())

class Alert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    condition = db.Column(db.String(50))
    threshold = db.Column(db.Float))
    severity = db.Column(db.String(20))
    status = db.Column(db.String(20), default='Active')
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

# API Routes
@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    REQUEST_COUNT.inc()
    system_id = request.args.get('system_id')
    if system_id:
        metrics = Metric.query.filter_by(system_id=system_id).order_by(Metric.timestamp.desc()).limit(100).all()
    else:
        metrics = Metric.query.order_by(Metric.timestamp.desc()).limit(100).all()
    return jsonify([m.serialize() for m in metrics])

@app.route('/api/alerts', methods=['GET', 'POST'])
def handle_alerts():
    REQUEST_COUNT.inc()
    if request.method == 'GET':
        alerts = Alert.query.filter_by(status='Active').all()
        return jsonify([a.serialize() for a in alerts])
    else:
        data = request.get_json()
        new_alert = Alert(
            name=data['name'],
            condition=data['condition'],
            threshold=data['threshold'],
            severity=data['severity']
        )
        db.session.add(new_alert)
        db.session.commit()
        return jsonify(new_alert.serialize()), 201

@app.route('/api/resources', methods=['GET'])
def get_resources():
    REQUEST_COUNT.inc()
    # Get data from Prometheus
    cpu_data = prometheus.get_cpu_metrics()
    memory_data = prometheus.get_memory_metrics()
    return jsonify({
        'cpu': cpu_data,
        'memory': memory_data
    })

@app.route('/api/ai/anomalies', methods=['GET'])
def detect_anomalies():
    REQUEST_COUNT.inc()
    # AI-powered anomaly detection
    metrics = Metric.query.order_by(Metric.timestamp.desc()).limit(1000).all()
    # Here you would implement actual anomaly detection logic
    # This is a simplified placeholder
    anomalies = []
    for metric in metrics:
        if metric.name == 'cpu_usage' and metric.value > 90:
            anomalies.append({
                'metric': 'CPU',
                'value': metric.value,
                'timestamp': metric.timestamp,
                'severity': 'High'
            })
    return jsonify(anomalies)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    start_http_server(8000)
    app.run(host='0.0.0.0', port=5000)