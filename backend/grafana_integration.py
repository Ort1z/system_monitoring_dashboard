import requests
import json

class GrafanaManager:
    def __init__(self, base_url="http://grafana:3000", api_key="your_api_key"):
        self.base_url = base_url
        self.api_key = api_key
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    def create_dashboard(self, dashboard_config):
        try:
            response = requests.post(
                f"{self.base_url}/api/dashboards/db",
                headers=self.headers,
                data=json.dumps(dashboard_config)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Error creating Grafana dashboard: {e}")
            return {"error": str(e)}
    
    def get_dashboard(self, dashboard_uid):
        try:
            response = requests.get(
                f"{self.base_url}/api/dashboards/uid/{dashboard_uid}",
                headers=self.headers)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Error getting Grafana dashboard: {e}")
            return {"error": str(e)}
    
    def create_alert(self, alert_config):
        try:
            response = requests.post(
                f"{self.base_url}/api/alerts",
                headers=self.headers,
                data=json.dumps(alert_config))
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Error creating Grafana alert: {e}")
            return {"error": str(e)}