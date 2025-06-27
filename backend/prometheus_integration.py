import requests

class PrometheusManager:
    def __init__(self, base_url="http://prometheus:9090"):
        self.base_url = base_url
    
    def get_cpu_metrics(self):
        try:
            response = requests.get(f"{self.base_url}/api/v1/query?query=avg(rate(node_cpu_seconds_total[1m]))")
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Error fetching CPU metrics: {e}")
            return {"error": str(e)}
    
    def get_memory_metrics(self):
        try:
            response = requests.get(f"{self.base_url}/api/v1/query?query=node_memory_MemAvailable_bytes/node_memory_MemTotal_bytes")
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Error fetching memory metrics: {e}")
            return {"error": str(e)}
    
    def get_metric_range(self, metric_name, start, end, step):
        try:
            response = requests.get(
                f"{self.base_url}/api/v1/query_range",
                params={
                    'query': metric_name,
                    'start': start,
                    'end': end,
                    'step': step
                }
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Error fetching metric range: {e}")
            return {"error": str(e)}