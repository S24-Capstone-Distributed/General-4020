# Distributed System Design Overview

## Use Cases for Distribution

- Efficient handling of large volumes of video transcoding tasks
- Improved scalability and availability
- Fault tolerance and resilience against component failures

## Reasons for Distribution

- Without distribution, processing multiple videos concurrently or dealing with exceptionally large video files could lead to significant delays, potentially rendering the service unusable.
- In a non-distributed system, if one component breaks, the whole system goes down. Distribution mitigates this risk by spreading the workload across multiple instances or nodes.
- Parallelizing the transcoding process across multiple nodes reduces overall processing time and improves scalability and availability.

## Distributed System Challenges

1. **Fault Detection and Recovery**
   - Failure of transcoder containers during transcoding process
   - Prompt detection and requeuing of failed tasks without data loss or duplication
   
2. **Autoscaling**
   - Dynamically adjusting the number of transcoder nodes based on workload and resource utilization
   - Ensuring optimal performance and resource efficiency
   
3. **Load Balancing**
   - Equitable distribution of workload across all nodes and transcoder workers
   - Preventing overload on individual nodes or workers

## Approach to Address Challenges

### Fault Detection and Recovery
- Implement health checks to continuously monitor the status of transcoder containers and nodes.
- Trigger automated processes to requeue failed tasks and redistribute workload to healthy nodes.
- Utilize checkpointing mechanisms to resume processing from the point of failure, minimizing redundancy and ensuring data integrity.

### Autoscaling
- Monitor key performance metrics such as CPU and memory utilization, as well as queue lengths.
- Automatically scale up or down transcoder nodes based on workload and resource usage.
- Proactively manage resource allocation to accommodate varying workloads while minimizing operational costs.

### Load Balancing
- Prioritize distribution of equal-sized segments of transcoding tasks to each available node.
- Manage workload distribution among transcoder workers to prevent overload.

## Phase Two Enhancements

- Network latency optimization. As long as the system works in a normal amount of time, that is good enough for now. In stage 2 we could work on optimizing the system and making it work even faster.
- Advanced load balancing algorithms based on machine performance. For now it is enough to distribute an equal amount of work to each node. But it is likely that some nodes will be more powerful than others. So in stage 2 we would work on distributing work based on how much the nodes are being utilized.
