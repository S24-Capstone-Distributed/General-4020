# Scope and Use Cases

# Heartbeat System Deployment

## Overview

This document outlines the deployment and operational details of the Heartbeat System within a distributed system. The Heartbeat System is crucial for monitoring the health and availability of all nodes, leveraging a centralized Kafka message queue for reporting.

## Trigger

- **Deployment or Restart**: Triggered when a new node is deployed within the distributed system or an existing node starts/stops sending heartbeats.

## Description

The process ensures continuous monitoring of node health and availability, utilizing heartbeat signals to detect active and inactive nodes. This data is reported through a Kafka message queue and analyzed via Elastic DB for comprehensive system health insights.

## Preconditions

- The heartbeat system package is installed and configured on all nodes.
- Kafka message queue is operational and accessible by all nodes.
- Elastic DB is set up for data aggregation and analysis.

## Basic Flow

1. **Heartbeat Sending**: Each node sends periodic heartbeat signals to indicate its operational status.
2. **Collection and Analysis**: A leader node or monitoring service collects these heartbeats, identifying inactive nodes and publishing their status to the Kafka queue.
3. **Data Processing**: The analytics and reporting service consumes these messages, processing and storing the information in Elastic DB.
4. **Reporting**: Provides API endpoints for querying health status and performance metrics, with REST API calls available for system health and performance reports.

## Node Failure Detection and Alerting

### Description

Covers the detection of node failures, alerting, and reporting mechanisms for system administrators or automated recovery systems.

### Trigger

- A node stops sending heartbeat signals for a predefined period.

### Preconditions

- Active monitoring of all nodes by the heartbeat system.
- Kafka message queue and Elastic DB configured for messaging and data analysis.

### Basic Flow

1. **Failure Detection**: The monitoring service detects a node's failure to send heartbeat signals.
2. **Alerting**: An alert message is published to Kafka, with the analytics service updating the Elastic DB and generating notifications.
3. **Recovery and Logging**: The system logs and reports are updated, with notifications for temporary downtimes or recoveries.

### Alternative Flows

- **Temporary Downtime**: If a node resumes sending heartbeats before alert escalation, the system updates its status and notifies administrators.

## System Performance Monitoring

### Description

Monitors system performance metrics to ensure optimal operation and identify bottlenecks.

### Trigger

- Periodic collection of performance metrics from nodes, including CPU, memory, network info, and other system info.

### Preconditions

- Nodes configured to report performance metrics.
- Kafka message queue and Elastic DB for data aggregation and analysis.

### Basic Flow

1. **Metric Collection**: Nodes publish performance metrics to Kafka at regular intervals.
2. **Data Processing**: The analytics service processes these metrics, with data aggregated and stored in Elastic DB.
3. **Performance Reporting**: Provides REST API endpoints for querying metrics, generating regular system performance reports.

### Alternative Flows

- **Anomaly Detection**: Alerts for performance anomalies and advanced analytics for predicting potential downtimes or degradations.

## Postconditions

- Accurate, up-to-date health and performance view of all nodes.
- System administrators have access to detailed reports and alerts.
- Prompt identification and resolution of potential issues, ensuring high system availability and performance.


## Real-time prices
_provide real-time streaming prices and cache_

- We will provide an API endpoint for data sources to send stock price updates
- We will provide an API endpoint for system components to get one or many stock prices
- We will provide a JAR file that allows clients to retrieve stock prices and automatically manages an in-memory cache on the client machine.
- Our system will be highly available such that the failure of several nodes wont prevent clients from being served
- Our system will provide a low-latency view of the price updates as they enter the system. We will conduct testing on industry level software to find a benchmark for throughput.
- The cache framework improve throughput and reduce network requests by reducing the number of spurious requests.
- Our system will be horizontally scalable such that it can ingest data from many sources and provide a consistent view of the data to many clients. We will conduct testing on industry level software to find a benchmark for performance under high demand. 
- Our system will always provide a consistent view of the data with regards to the order that the price updates enter the system. I.e updates to one stock that were sent later wont be available before updates that were sent earlier.
