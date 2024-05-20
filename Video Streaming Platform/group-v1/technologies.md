# Tools & Technologies

> List the tools and technologies you plan on using. For each, explain why you decided to use that particular tool or technology. List other options you evaluated and explain why you chose not to use them.*

## Java

- **Reason for Use:**  Familiarity and ease of use with JUnit, Maven, etc.

## Spring boot

- **Reason for Use:** Spring Boot, a framework on top of Java, was utilized for its robust ecosystem and extensive libraries, which expedite development tasks, particularly in web application development.

## JUnit

- **Reason for Use:** Familiarity with the testing capabilities of JUnit.

## Maven

- **Reason for Use:** Powerful package and project tool that has all the packages we need and we are familiar with it.

## Docker

- **Reason for Use:** Docker was selected for its lightweight containerization, allowing for consistent deployment across environments with minimal setup and the ability to simulate multiple separate machines.

## HAProxy

- **Reason for Use:** HAProxy was chosen for its high performance, reliability, and flexibility in load balancing and proxying tasks. It excels in distributing network traffic efficiently across multiple servers, ensuring optimal resource utilization and high availability. HAProxy's extensive features, including advanced load balancing algorithms, SSL termination, and health checking, made it the preferred choice for managing the project's load balancing needs.

- **Considered Alternatives:** Nginx.

## Apache Zookeeper

- **Reason for Use:** Zookeeper allowed us to keep track of which storage nodes are alive and notify us when a node joins the cluster or when a node leaves/fails. 
- **Considered Alternatives:** Implementing this ourselves.

## Postgres

- **Reason for Use:** We needed a fault tolerant database to store metadata about the objects in our system.
- **Considered Alternatives:** Redis, MongoDB.