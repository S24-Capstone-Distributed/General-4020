# Software Architecture Diagrams (C4)

> *Define your architecture using C4 diagrams to visualize the system. Be sure to indicate where and how redundancy is used in your system. Reference workflow and the distributed challenges documents where appropriate.*

## System Context diagram

![System Context diagram](./diagrams/system_context.png)

## Container diagram

![Container diagram](./diagrams/containers.png)

- API Gateway is the exposed API the other VSP groups will be using to access the data we store or give us data to store
- Data Router will be routing data to the appropriate storage nodes and using the Placement Service to figure out where to store and get objects
- The placement service will keep track of all the IDs of the videos and sub-keys for partitioned larger data. This will allow requests for a video to be found using its name to ID,
  and then use all sub-keys to find parts and give each part in order.
- The storage nodes are our servers in a Zookeeper Cluster that will replicate data, and store the objects in buckets. They will also be sharing their health data with other nodes.
