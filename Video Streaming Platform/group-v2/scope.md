## Table of Contents
- [Client Requests Processing of Video](#client-requests-processing-of-video)
- [Autoscaling Workflow](#autoscaling-workflow)
- [Error Handling: Functional Container Error](#error-handling-functional-container-error)
- [Error Handling: Container Failure](#error-handling-container-failure)


## Client Requests Processing of Video

**Trigger:** Client request received over RabbitMQ with a task ID.

**Description:** This workflow describes how a video is processed within a single pod and process. It involves receiving a message over RabbitMQ with a task ID, pulling the necessary video file from the object store, transcoding it, and uploading the transcoded file back to the storage service. This describes the happy path. Error handling is discussed later.

**Preconditions:**
- The system is actively processing video transcoding tasks.
- The video task details are available via RabbitMQ.
- The necessary video file exists in the object store.

**Basic Flow:**
1. Take message off of RabbitMQ containing the task ID.
2. Log to the database that this task ID was taken off with details about the container that is processing it.
3. Retrieve task details from the database using the provided task ID.
4. Pull the necessary video file from the object store based on the task details.
5. Log in the database that the video file has been pulled for transcoding.
6. Transcode the video file to desired resolutions and bitrates.
7. Log in the database that the video has been transcoded.
8. Upload the transcoded video file back to the storage service.
9. Log in the database that the transcoded video has been uploaded.

## Autoscaling Workflow

**Description:** This workflow describes how the system dynamically scales based on the CPU utilization of worker nodes.

**Preconditions:**
- The system is actively processing video transcoding tasks.
- The video has been uploaded in the correct format to the storage service.

**Basic Flow:**
1. Monitor the CPU utilization of all worker nodes.
2. If the average CPU utilization is high:
   - Spin up additional worker nodes to handle the increased workload.
3. If the average CPU utilization is very low:
   - Block underutilized nodes from receiving any more work and shut them down underutilized after they finish their current tasks.
4. Continue monitoring and adjusting the number of worker nodes as needed.

## Error Handling: Functional Container Error

**Description:** This workflow addresses errors encountered within the single functional container during the processing of video tasks. It involves retries and escalation procedures to ensure task completion and system reliability.

**Trigger:** The functional container encounters an error during the pull, transcode, or push operation.

**Preconditions:**
- The system is actively processing video transcoding tasks.
- The functional container is still functioning but has encountered an error during its operation.

**Basic Flow:**
1. Upon encountering an error, the functional container logs the error message and increments the retry counter for the task.
2. The system checks the retry count against a predefined threshold to determine whether to retry the operation or escalate the issue.
3. If the retry count is below the threshold:
   - The system retries the operation after a brief delay to allow for potential transient issues to resolve.
   - If the retry is successful, the task continues as normal.
4. If the retry count exceeds the threshold:
   - The system escalates the issue to system administrators or designated personnel for manual intervention.
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
2. Upon detecting a container failure, the system marks the affected tasks as "failed" or "incomplete" and initiates recovery procedures.
3. Recovery procedures may involve restarting the failed container, rescheduling tasks within the same container, or reallocating resources as necessary.
4. System administrators or automated processes investigate the root cause of the failure and take corrective actions to prevent recurrence.
5. Once the container is restored, the system resumes processing and updates task statuses accordingly.
6. Progress updates and status changes are logged to the database for monitoring and tracking purposes.

**Alternative Flows:**
- If the container failure is due to resource constraints, the system may dynamically adjust resource allocations or trigger autoscaling mechanisms to mitigate future failures.
- If the failure persists despite recovery attempts, the system may escalate the issue for further investigation by system administrators or engineers.

**Postconditions:**
- The system maintains reliability and availability by promptly detecting and recovering from container failures, ensuring minimal disruption to video processing operations.
