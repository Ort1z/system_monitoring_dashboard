from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class System(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(50), nullable=False)

class Metric(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    value = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(20), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    system_id = db.Column(db.Integer, db.ForeignKey('system.id'), nullable=False)

class Alert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    threshold = db.Column(db.Float, nullable=False)
    condition = db.Column(db.String(20), nullable=False)
    severity = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    system_id = db.Column(db.Integer, db.ForeignKey('system.id'), nullable=False)
    metric_id = db.Column(db.Integer, db.ForeignKey('metric.id'), nullable=False)

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    metrics = Metric.query.all()
    return jsonify([{
        'id': m.id,
        'type': m.type,
        'value': m.value,
        'unit': m.unit,
        'timestamp': m.timestamp.isoformat(),
        'system_id': m.system_id
    } for m in metrics])

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    alerts = Alert.query.all()
    return jsonify([{
        'id': a.id,
        'threshold': a.threshold,
        'condition': a.condition,
        'severity': a.severity,
        'status': a.status,
        'system_id': a.system_id,
        'metric_id': a.metric_id
    } for a in alerts])

@app.route('/api/systems', methods=['GET'])
def get_systems():
    systems = System.query.all()
    return jsonify([{
        'id': s.id,
        'name': s.name,
        'description': s.description,
        'type': s.type
    } for s in systems])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
