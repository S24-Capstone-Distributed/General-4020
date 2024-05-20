# Distributed System Challenges

> *Identify the use cases and reasons why your system and/or components need to be distributed. Explain how and why "going distributed" solves the issues. Identify and list the resultant distributed system challenges that you need to address. For each challenge or issue, explain how you propose to address it. If you do not plan on addressing a particular challenge, explain why it is not critical and out of scope for your project. Indicate how it could be addressed in "phase two" of your project.*

1. Consistency and Coherency:
   - Achieving consistency across distributed S3 nodes can be complex due to the massive scale and concurrent writes.
   - Ensuring that all replicas of an object are consistent and coherent is crucial for data integrity.
   - We address this by internally storing any modifications as a completely new file. We dont tell the user that a put was successful until at least 2 replicas have been successfully stored. 
2. Durability and Availability:
   - S3 is designed for high durability, but achieving this across a large number of nodes while maintaining availability can be challenging.
   - Balancing data replication, fault tolerance, and recovery mechanisms is essential.
   - We address this by having multiple data router instances as well as multiple storage nodes. These can take over in case one fails to maintain availability. We also keep replicas of all data to ensure none is lost.
3. Latency and Throughput:
   - S3 must handle read and write requests efficiently, even with a large number of concurrent users.
   - We address this by having multiple data router instances as well as multiple storage nodes. This provides additional bandwidth for user requests. Since our system is scalable, we can add more instances of each to maintain the desired latency and throughput.
4. Scalability and Load Balancing:
   - As the number of users and data grows, S3 must scale horizontally to accommodate the load.
   - Proper load balancing across nodes is critical to prevent bottlenecks.
   - We address this in our storage nodes by using zookeeper to detect new nodes added to the system and handle additions accordingly. 
   - We address this in our data routers by making them completely stateless. Therefore we can add more instances as needed and use HAProxy to balance the load between them.
5. Data Partitioning and Sharding:
   - Distributing data across nodes (sharding) while ensuring balanced partitions is complex.
   - Deciding how to split data and manage metadata efficiently is a challenge.
   - Although we did not have time to implement this feature, we designed our system with this in mind. Our Postgress database keeps track of all partitions of a file and the storage nodes store them as if they are any other piece of data.
