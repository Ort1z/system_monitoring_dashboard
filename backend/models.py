from datetime import datetime
from backend import db

class System(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(200))
    ip_address = db.Column(db.String(15))
    type = db.Column(db.String(50))  # Server, Application, Network Device
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'ip_address': self.ip_address,
            'type': self.type,
            'created_at': self.created_at.isoformat()
        }

class Metric(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    system_id = db.Column(db.Integer, db.ForeignKey('system.id'))
    name = db.Column(db.String(100))
    value = db.Column(db.Float))
    unit = db.Column(db.String(20))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    def serialize(self):
        return {
            'id': self.id,
            'system_id': self.system_id,
            'name': self.name,
            'value': self.value,
            'unit': self.unit,
            'timestamp': self.timestamp.isoformat()
        }

class Alert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    condition = db.Column(db.String(50))
    threshold = db.Column(db.Float))
    severity = db.Column(db.String(20))
    status = db.Column(db.String(20), default='Active')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    resolved_at = db.Column(db.DateTime)
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'condition': self.condition,
            'threshold': self.threshold,
            'severity': self.severity,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'resolved_at': self.resolved_at.isoformat() if self.resolved_at else None
        }