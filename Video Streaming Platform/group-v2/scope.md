## Client Requests Processing of Video

**Trigger:** Client request received over RabbitMQ with a task ID.

**Description:** This workflow describes how a video is processed within a single pod and process. It involves receiving a message over RabbitMQ with a task ID, pulling the necessary video file from the object store, transcoding it, and uploading the transcoded file back to the storage service. This describes the happy path. Error handling is discussed later.

**Preconditions:**
- The system is actively processing video transcoding tasks.
- The video task details are available via RabbitMQ.
- The necessary video file exists in the object store.

**Basic Flow:**
1. Take message off of RabbitMQ containing the task ID.
2. Retrieve task details from the database using the provided task ID.
3. Pull the necessary video file from the object store based on the task details.
4. Log in the database that the video file has been pulled for transcoding.
5. Transcode the video file to desired resolutions and bitrates.
6. Log in the database that the video has been transcoded.
7. Upload the transcoded video file back to the storage service.
8. Log in the database that the transcoded video has been uploaded.

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

## Container Failure: Transcoder

**Description:** In the event that a transcoder container within a pod fails during the transcoding process, the system needs to handle the failure gracefully and ensure that the transcoding task is re-queued for processing without losing progress or data integrity.

**Trigger:** The transcoder container encounters an unexpected error, such as a runtime exception, resource exhaustion, or network connectivity issue, leading to its failure.

**Preconditions:**
- The system is actively processing video transcoding tasks.
- The failed transcoder container is part of a pod within the transcoding cluster.

**Basic Flow:**
1. Upon detecting the failure of the transcoder container, the system marks the transcoding task associated with the failed container as "failed" or "incomplete."
2. The system automatically triggers the re-queuing mechanism to reschedule the failed transcoding task for processing.
3. The scheduler assigns the re-queued transcoding task to an available transcoder container within the cluster for processing.
4. The transcoding process resumes from the point of failure, utilizing any available progress or checkpoint data to minimize redundancy.
5. Progress updates and status changes are logged to the database for monitoring and tracking purposes.

**Alternative Flows:**
- If the failure is due to a transient issue (e.g., network interruption), the system may attempt to reconnect and resume processing without re-queuing the task immediately.
- If the failure persists despite recovery attempts, the system may escalate the issue for manual intervention or further investigation by system administrators.

**Postconditions:**
- The failed transcoding task is successfully re-queued and resumed without data loss or duplication.
- Progress updates and status changes are accurately reflected in the system's logs and monitoring tools.
- The system maintains reliability and availability despite individual container failures within the transcoding cluster.

## Container Failure: Puller

**Description:** In the event that the container responsible for pulling video files from the distributed storage service fails during the file retrieval process, the system needs to handle the failure gracefully and ensure that the files are re-pulled for processing without data loss or duplication.

**Trigger:**
- The puller container encounters an unexpected error, such as a runtime exception, resource exhaustion, or network connectivity issue, leading to its failure during the file retrieval process.

**Preconditions:**
- The system is actively processing video transcoding tasks.
- The failed puller container is part of a pod within the processing cluster.

**Basic Flow:**
1. Upon detecting the failure of the puller container, the system marks the affected file retrieval task as "failed" or "incomplete."
2. The system automatically triggers the re-pulling mechanism to retrieve the failed files for processing.
3. The scheduler assigns the re-pulled files to an available puller container in the same pod for retrieval.
4. The file retrieval process resumes from the point of failure, utilizing any available progress or checkpoint data to minimize redundancy.
5. If the whole pod has failed, then the scheduler will assign a different node to pull, and it will start from scratch.
6. Progress updates and status changes are logged to the database for monitoring and tracking purposes.

**Alternative Flows:**
- If the failure is due to a transient issue (e.g., network interruption), the system may attempt to reconnect and resume retrieval without re-pulling the files immediately.
- If the failure persists despite recovery attempts, the system may escalate the issue for manual intervention or further investigation by system administrators.

**Postconditions:**
- The failed file retrieval task is successfully re-pulled and resumed without data loss or duplication.
- Progress updates and status changes are accurately reflected in the system's logs and monitoring tools.
- The system maintains reliability and availability despite individual container failures within the file retrieval cluster.

## Container Failure: Pusher

**Description:** In the event that the container responsible for pushing processed video files to the storage service fails during the upload process, the system needs to handle the failure gracefully and ensure that the files are re-uploaded without data loss or duplication.

**Trigger:**
- The pusher container encounters an unexpected error, such as a runtime exception, resource exhaustion, or network connectivity issue, leading to its failure during the file upload process.

**Preconditions:**
- The system is actively processing video transcoding tasks.
- The failed pusher container is part of a pod within the processing cluster.

**Basic Flow:**
1. Upon detecting the failure of the pusher container, the system marks the affected file upload task as "failed" or "incomplete."
2. The system automatically triggers the re-uploading mechanism to upload the failed files.
3. The scheduler assigns the re-uploaded files to an available pusher container within the same pod for upload.
4. The file upload process resumes from the point of failure, utilizing any available progress or checkpoint data to minimize redundancy.
5. If the whole pod has failed, all of the work will have to be done again on another node.
6. Progress updates and status changes are logged to the database for monitoring and tracking purposes.

**Alternative Flows:**
- If the failure is due to a transient issue (e.g., network interruption), the system may attempt to reconnect and resume upload without re-uploading the files immediately.
- If the failure persists despite recovery attempts, the system may escalate the issue for manual intervention or further investigation by system administrators.

**Postconditions:**
- The failed file upload task is successfully re-uploaded and resumed without data loss or duplication.
- Progress updates and status changes are accurately reflected in the system's logs and monitoring tools.
- The system maintains reliability and availability despite individual container failures within the file upload cluster.
