## Table of Contents
- [Client Requests Processing of Video](#client-requests-processing-of-video)
- [Autoscaling Workflow](#autoscaling-workflow)
- [Error Handling: Functional Container Error](#error-handling-functional-container-error)
- [Error Handling: Container Failure](#error-handling-container-failure)
- [Gossip-Based Heartbeat Protocol Between Containers/Pods](#gossip-based-heartbeat-protocol-between-containerspods)
- [Dynamic Container Scaling Within a Node Based on CPU/RAM Utilization During Workload Processing](#dynamic-container-scaling-within-a-node-based-on-cpuram-utilization-during-workload-processing)

## Relevant Events and Descriptions

### 1. TaskReceived
**Description:** Event triggered when a new video transcoding task is received from the message bus / queue.

### 2. TaskDetailsRetrieved
**Description:** Event triggered after retrieving task details from the database using the provided task ID.

### 3. VideoFilePulled
**Description:** Event triggered after successfully pulling the necessary video file from the object store based on the task details.

### 4. VideoTranscoded
**Description:** Event triggered after the video file has been transcoded to desired resolutions and bitrates.

### 5. TranscodedVideoUploaded
**Description:** Event triggered after successfully uploading the transcoded video file back to the storage service.

### 6. WorkerNodeScaledUp
**Description:** Event triggered when a new worker node is spun up to handle increased workload due to high CPU utilization.

### 7. WorkerNodeScaledDown
**Description:** Event triggered when an underutilized worker node is scheduled for shutdown after finishing its current tasks.

### 8. ContainerErrorRetry
**Description:** Event triggered when an error is encountered during the processing of a video transcoding task, and the system retries the operation.

### 9. ContainerErrorEscalation
**Description:** Event triggered when an error is encountered during the processing of a video transcoding task, and the issue is escalated to system administrators for manual intervention.

### 10. ContainerFailureDetected
**Description:** Event triggered upon detecting a failure of the container within the processing pod, initiating recovery procedures.

### 11. HeartbeatReceived
**Description:** Event triggered upon receiving a heartbeat signal from a container or pod within the system.

### 12. GossipTableMerged
**Description:** Event triggered after merging received gossip tables to ensure consistency and update records accordingly.

### 13. ContainerScaledUp
**Description:** Event triggered when additional containers are launched to distribute workload and alleviate resource constraints during workload processing.

### 14. ContainerScaledDown
**Description:** Event triggered when containers are shut down after finishing their current jobs to optimize resource utilization during workload processing.

### 15. ResourceUtilizationThresholdReached
**Description:** Event triggered when CPU or RAM utilization reaches predefined thresholds during workload processing, prompting scaling actions.

### 16. WorkloadProcessingStarted
**Description:** Event triggered when a container starts processing a video transcoding task, signaling its activity.

### 17. WorkloadProcessingFinished
**Description:** Event triggered when a container finishes processing a video transcoding task, signaling its inactivity.

## Client Requests Processing of Video

**Trigger:** Client request received over RabbitMQ with a task ID.

**Description:** This workflow describes how a video is processed within a single pod and process. It involves receiving a message over RabbitMQ with a task ID, pulling the necessary video file from the object store, transcoding it, and uploading the transcoded file back to the storage service. This describes the happy path. Error handling is discussed later.

**Preconditions:**
- The system is actively processing video transcoding tasks.
- The video task IDs are available via RabbitMQ.
- The necessary video file exists in the object store.
- The details for this task are stored in the database and can be accessed using the task ID.

**Basic Flow:**
1. Take message off of the message bus / queue containing the task ID.
2. Share on the message bus / queue a TaskReceived event and log it to the database.
3. Retrieve task details from the database using the provided task ID.
4. Pull the necessary video file from the object store based on the task details.
5. Share on the message bus / queue a VideoFilePulled event and log it to the database.
6. Transcode the video file to desired resolutions and bitrates.
7. Share on the message bus / queue a VideoTranscoded event and log it to the database. 
8. Upload the transcoded video file back to the storage service.
9. Share on the message bus / queue a TranscodedVideoUploaded event and log it to the database.  

## Autoscaling Workflow

**Description:** This workflow describes how the system dynamically scales based on the CPU utilization of worker nodes.

**Preconditions:**
- The system is actively processing video transcoding tasks.

**Basic Flow:**
1. Each worker node continuously monitors its own CPU and RAM utilization.
2. Worker nodes share their CPU and RAM utilization data with the node responsible for coordinating autoscaling.
3. The coordinating node aggregates the CPU utilization data from all worker nodes.
4. If the average CPU utilization across all worker nodes is high:
   - The coordinating node initiates the spinning up of additional worker nodes to handle the increased workload.
   -  Share on the message bus / queue a WorkerNodeScaledUp event and log it to the database.   
5. If the average CPU utilization across all worker nodes is very low:
   - The coordinating node blocks underutilized nodes from receiving any more work and schedules them for shutdown after they finish their current tasks.
   - Once a node is shut down, share on the message bus / queue a WorkerNodeScaledDown event and log it to the database.   
6. Continuously monitor and adjust the number of worker nodes as needed based on the aggregated CPU utilization data from all worker nodes.

## Error Handling: Functional Container Error

**Description:** This workflow addresses errors encountered within the single functional container during the processing of video tasks. It involves retries and escalation procedures to ensure task completion and system reliability.

**Trigger:** The functional container encounters an error during the pull, transcode, or push operation.

**Preconditions:**
- The system is actively processing video transcoding tasks.
- The functional container is still functioning but has encountered an error during its operation.

**Basic Flow:**
1. Upon encountering an error within the container there are two options.
2. If the error is in pulling or pushing:
   - The system checks the retry count against a predefined threshold to determine whether to retry the operation or escalate the issue.
   - If the retry count is below the threshold:
     - The system retries the operation after a brief delay to allow for potential transient issues to resolve, utilizing exponential backoff.
     - If the retry is successful, the task continues as normal.
   - If the retry count exceeds the threshold:
     - The container shares on the message bus / queue a ContainerErrorEscalation event, logs it to the database, and then goes on to work on other tasks.   
4. If the error is in transcoding:
   - The system does not retry the transcoding operation as it's unlikely to be resolved by retries.
   - The container shares on the message bus / queue a ContainerErrorEscalation event, logs it to the database, and then goes on to work on other tasks. 
5. System administrators investigate the root cause of the error and take appropriate actions to resolve it, such as adjusting configurations, restarting the container, or reallocating resources.
6. Once the issue is resolved, the system updates the task status accordingly and resumes processing.
7. Progress updates and status changes are logged to the database for monitoring and tracking purposes.

**Alternative Flows:**
- If the error is transient and resolves after a retry attempt, the system continues processing without escalation.
- If the error persists despite retry attempts, the system may implement additional measures, such as exponential backoff or circuit breaker strategies, before escalating the issue.

**Postconditions:**
- The system maintains reliability and availability by handling functional container errors gracefully and ensuring timely resolution through retries and escalation procedures.

## Error Handling: Container Failure

**Description:** This workflow addresses the failure of the single container within the processing pod. It involves detection, recovery, and system stability measures to mitigate the impact of container failures on video processing tasks.

**Trigger:** The container fails due to runtime exceptions, resource exhaustion, or other critical issues.

**Preconditions:**
- The system is actively processing video transcoding tasks.
- The container failure affects the processing pod's ability to handle tasks.

**Basic Flow:**
1. The system monitors container health through heartbeat signals or other health checks.
2. Upon detecting a container failure through the heartbeat protocol described below, the node in charge of error handling marks the affected tasks as "failed" or "incomplete" and initiates recovery procedures.
3. Recovery procedures generally will involve checking if the failed container was working on any tasks when it failed, and if it was, sending a ContainerFailureDetected event on the message bus / queue, which contains the task ID to requeue and logging it to the database. 
4. There will be a machine in charge of requeueing tasks listening on the queue in order to requeue these faied tasks.
5. Progress updates and status changes are logged to the database for monitoring and tracking purposes.

**Alternative Flows:**
- If the container failure is due to resource constraints, the system may dynamically adjust resource allocations or trigger autoscaling mechanisms to mitigate future failures.
- If the failure persists despite recovery attempts, the system may escalate the issue for further investigation by system administrators or engineers.

**Postconditions:**
- The system maintains reliability and availability by promptly detecting and recovering from container failures, ensuring minimal disruption to video processing operations.

## Gossip-Based Heartbeat Protocol Between Containers/Pods

**Description:** This workflow outlines the process of exchanging heartbeat signals between containers or pods within the system using a gossip-based protocol. The protocol involves randomly selecting peers to exchange heartbeat signals, updating activity timestamps, merging gossip tables, and handling inactive or failed peers.

**Preconditions:**
- The system consists of multiple containers or pods that need to communicate their status.
- Gossip-based heartbeat mechanisms are implemented within the containers or pods.

**Basic Flow:**
1. Each container or pod periodically selects a random subset of peers to send heartbeat signals to.
2. Upon receiving a heartbeat signal:
   - If the sender is already marked as active, the receiving container or pod updates the latest activity timestamp for that sender.
   - If the sender was previously marked as inactive and has been inactive for at least double the heartbeat timeout period, and it now sends a heartbeat signal, the receiving container or pod re-adds it to the table and marks it as active.
   - Otherwise, the sender is still considered to be inactive, and it's gossip table is ignored.
3. Each container or pod shares its gossip table containing information about when peers were last active when sending out heartbeat signals.
4. Upon receiving a heartbeat signal, each container or pod merges the received gossip table with its own to ensure consistency and update its records accordingly.
5. Periodically, each container or pod iterates through its heartbeat table to identify peers that have not received any information for a while.
6. Peers that have been inactive for an extended period, beyond a predefined threshold, are marked as failed.
7. Monitoring systems track the frequency of heartbeat signals and raise alerts if abnormalities or failures are detected.

**Alternative Flows:**
- In scenarios where network partitions or communication issues occur, the system may employ quorum-based approaches or consensus algorithms to maintain integrity and availability.

**Postconditions:**
- The gossip-based heartbeat protocol facilitates continuous monitoring and synchronization between containers or pods, enhancing the system's resilience and fault tolerance.

## Dynamic Container Scaling Within a Node Based on CPU/RAM Utilization During Workload Processing

**Description:** This workflow outlines the process of dynamically scaling containers within a single node based on CPU and RAM utilization specifically during workload processing. It incorporates continuous monitoring of CPU and RAM utilization and adjusts the number of containers based on the node's capacity and workload demands.

**Preconditions:**
- The system utilizes container orchestration platforms like Kubernetes.
- CPU and RAM utilization metrics are available for monitoring at the node level.
- Workload processing involves CPU and RAM-intensive tasks, such as video transcoding.
- Each container sends start and end messages when processing tasks to signal its activity.

**Basic Flow:**
1. Continuously monitor the CPU and RAM utilization of the node during workload processing to gauge resource demand.
2. If there is one active container:
   - When the container starts processing a video, it sends a start message to the container monitoring cpu utilization to signal its activity.
   - If the CPU or RAM utilization is below predefined thresholds during container processing:
     - Assess the available CPU and RAM capacity to determine if additional containers can be launched without overloading the node.
     - If feasible, dynamically scale up by launching additional containers to distribute the workload more evenly and alleviate resource constraints.
     - Monitor the CPU and RAM utilization of the newly launched containers to ensure they contribute effectively to workload processing.
     - Log the scaling activity and update resource allocations for monitoring purposes.
   - When the container finishes processing, it sends an end message to signal its inactivity.
   - If the CPU or RAM utilization is below predefined thresholds during container processing:
     - Start shutting down containers once they finish their current jobs until the cpu / ram usage is back to normal.    
3. If there are multiple active containers:
   - Follow the same process as described for a single active container to determine if additional containers need to be launched or existing containers need to be terminated based on resource utilization, but only launch additional containers when cpu / ram utilization is low even when all containers are currently processing.
4. Continuously monitor CPU and RAM utilization and consider scaling containers dynamically based on workload demands and node capacity to maintain optimal resource utilization and performance during workload processing.

**Alternative Flows:**
- Implement advanced algorithms to predict future workload demands and adjust container scaling proactively based on historical data and trends.
- Integrate with application-level metrics or performance indicators to align container scaling with specific application requirements and performance goals.

**Postconditions:**
- The dynamic container scaling workflow within a node based on CPU and RAM utilization during workload processing optimizes resource allocation, enhances scalability, and ensures efficient workload processing on the node.
