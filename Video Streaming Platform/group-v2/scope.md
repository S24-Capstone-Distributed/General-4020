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
## Feature: Client Requests Processing of Video

Scenario: Processing of Video Task

Given a client request received over the message bus / queue with a task ID

When the message is taken off of the message bus / queue

Then a TaskReceived event is shared on the message bus / queue and logged to the database

And task details are retrieved from the database using the provided task ID

And the necessary video file is pulled from the object store based on the task details

Then a VideoFilePulled event is shared on the message bus / queue and logged to the database

And the video file is transcoded to desired resolutions and bitrates

Then a VideoTranscoded event is shared on the message bus / queue and logged to the database

And the transcoded video file is uploaded back to the storage service

Then a TranscodedVideoUploaded event is shared on the message bus / queue and logged to the database

## Feature: Autoscaling Workflow

Scenario: Dynamic Scaling Based on CPU Utilization
Given the system is actively processing video transcoding tasks
When each worker node continuously monitors its own CPU and RAM utilization
And worker nodes share their utilization data with the coordinating node
Then if the average CPU utilization across all worker nodes is high
And additional worker nodes are initiated to handle the increased workload
Then a WorkerNodeScaledUp event is shared on the message bus / queue and logged to the database
But if the average CPU utilization across all worker nodes is very low
And underutilized nodes are scheduled for shutdown after finishing current tasks
Then a WorkerNodeScaledDown event is shared on the message bus / queue and logged to the database
And the number of worker nodes is continuously monitored and adjusted based on CPU utilization

## Feature: Error Handling - Functional Container Error

Scenario: Retry and Escalation for Functional Container Error
Given the system is actively processing video transcoding tasks
And the functional container encounters an error during its operation
When the error is in pulling or pushing the video file
Then the system checks the retry count against a predefined threshold
And if the retry count is below the threshold, the operation is retried with exponential backoff
But if the retry count exceeds the threshold, the error is escalated
Then a ContainerErrorEscalation event is shared on the message bus / queue and logged to the database
And system administrators investigate and resolve the issue
And once resolved, the system updates the task status and resumes processing

## Feature: Error Handling - Container Failure

Scenario: Detection and Recovery of Container Failure
Given the system is actively processing video transcoding tasks
And a container within the processing pod fails
When the failure is detected through the heartbeat protocol
Then affected tasks are marked as "failed" or "incomplete" and recovery procedures are initiated
And a ContainerFailureDetected event is shared on the message bus / queue and logged to the database
And failed tasks are requeued for processing
And progress updates and status changes are logged for monitoring purposes

## Feature: Gossip-Based Heartbeat Protocol Between Containers/Pods

Scenario: Exchange of Heartbeat Signals
Given the system consists of multiple containers or pods
And gossip-based heartbeat mechanisms are implemented within them
When each container or pod periodically sends heartbeat signals to random subsets of peers
Then upon receiving a heartbeat signal, the activity timestamp is updated
And the received gossip table is merged and updated accordingly
And inactive or failed peers are identified and managed
And monitoring systems track heartbeat signals and raise alerts for abnormalities

## Feature: Dynamic Container Scaling Within a Node Based on CPU/RAM Utilization During Workload Processing

Scenario: Dynamic Scaling Based on CPU/RAM Utilization
Given the system utilizes container orchestration platforms
And CPU and RAM utilization metrics are available for monitoring
And workload processing involves CPU and RAM-intensive tasks
When containers dynamically scale within a node during workload processing
Then containers start or stop based on CPU and RAM utilization thresholds
And events are shared on the message bus / queue and logged for monitoring
And the number of containers is continuously adjusted based on workload demands
