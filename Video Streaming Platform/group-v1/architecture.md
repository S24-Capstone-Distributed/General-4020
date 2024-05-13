# Software Architecture Diagrams (C4)

> *Define your architecture using C4 diagrams to visualize the system. Be sure to indicate where and how redundancy is used in your system. Reference workflow and the distributed challenges documents where appropriate.*

## System Context diagram

![System Context diagram](./diagrams/system_context.png)

## Container diagram

![Container diagram](./diagrams/containers.png)

- Load balancer is used to distribute the load across multiple Data Router instances
- Data Router exposes an HTTP API for users to store and retreive files. It communicates with the storage nodes to store and retrieve files
- The storage nodes store the files and replecate files among themselves.
- Zookeeper is used to manage the storage nodes and keep track of their health status. It is used by the nodes to know where to replecate files and when to rereplicate. It is used by the Data Router to know where to store files and where to retrieve them.
- The Postgres database is used to store metadata about the files stored in the system. It is used by the Data Routers to keep track of the files that have been stored on the system
