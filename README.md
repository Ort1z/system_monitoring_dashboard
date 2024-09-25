# System Monitoring Dashboard

A comprehensive web-based platform designed to monitor and manage system performance and infrastructure. This project aims to help DevOps teams and IT administrators effectively monitor, analyze, and manage the performance and health of their infrastructure and applications through real-time metrics, custom alerts, resource utilization tracking, and reporting.

## Team Members
- **Masingita Maluleke**  
  - Backend Developer: Responsible for designing the server-side architecture, implementing APIs, and integrating with system monitoring tools.  
  - Frontend Developer: Developing the user interface, visualizations, and interactive elements of the dashboard.  
  - DevOps Engineer: Handling deployment, configuration management, and infrastructure as code aspects of the project.

## Technologies Used
- **Python**: Backend server and API development
- **Flask**: Backend web framework
- **React.js**: Interactive frontend
- **SQLAlchemy**: ORM library for database integration
- **Prometheus**: System and application monitoring
- **Grafana**: Data visualization and dashboard creation
- **Ansible**: Configuration management and infrastructure automation
- **Docker**: Containerization and deployment
- **Git/GitHub**: Version control and collaboration

## Challenge Statement
The project aims to create a comprehensive system monitoring dashboard that provides features such as real-time metrics, custom alerts, resource utilization tracking, and reporting, all within a centralized and user-friendly web interface.

## Risks
### Technical Risks
- **Integration of Multiple Tools**: Ensuring seamless data flow between Prometheus, Grafana, and custom backend components.
- **Scalability**: Designing a scalable backend to handle large volumes of monitoring data efficiently.

### Non-Technical Risks
- **Team Coordination**: Ensuring effective collaboration across different roles (backend, frontend, DevOps).
- **Timeline Adherence**: Delivering the MVP within a tight project timeline.

## Infrastructure
- **Version Control**: Git Flow branching strategy
- **CI/CD**: Continuous Integration and Continuous Deployment pipeline using tools like GitHub Actions or Jenkins
- **Deployment**: Docker containerized solution on a cloud platform (e.g., AWS, Azure, or GCP)
- **Testing**: Combination of unit tests, integration tests, and end-to-end tests

## Existing Solutions
- **Prometheus**: Open-source monitoring system for metrics and alerting
- **Grafana**: Data visualization and dashboard platform
- **Nagios**: Monitoring tool for system and network performance
- **ELK Stack**: Suite of tools for log management and analysis

## Progress
**Rating**: 7/10  
Significant progress has been made toward completing the MVP. We have set up the basic architecture and implemented core backend functionality. Challenges with integrating Prometheus and Grafana, and performance issues with the frontend, have slowed our pace but considerable headway has been made.

### Completed as Planned
- Basic backend architecture implemented
- Core API routes operational
- Initial integration with Prometheus and Grafana established

### Incomplete Aspects
- Final integration and data flow management between Prometheus, Grafana, and our backend
- Optimization of real-time performance and scalability
- Completion of frontend features and customizations

## Challenges
### Technical Challenges
- **Integration Complexity**: Managing data synchronization and formats between Prometheus, Grafana, and the custom backend has been challenging.
- **Scalability Concerns**: Handling large volumes of real-time monitoring data and optimizing data storage and retrieval methods.
- **Frontend Performance**: Issues with rendering real-time metrics and visualizations, particularly with multiple systems.

### Non-Technical Challenges
- **Time Management**: Balancing workload across backend, frontend, and DevOps roles has been challenging.
- **Learning Curve**: Time spent learning new technologies such as Prometheus and Grafana has impacted development speed.

## Screenshots
![Screenshot 1](path/to/screenshot1.png)
![Screenshot 2](path/to/screenshot2.png)

## Deployed Site
[View the live dashboard](https://your-deployed-site-link.com)

## Author Links
- [Masingita Maluleke LinkedIn](https://linkedin.com/in/yourprofile)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/system-monitoring-dashboard.git
