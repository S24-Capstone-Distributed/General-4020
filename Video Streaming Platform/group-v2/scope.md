## Client Requests Processing of Video

Users upload videos in one format (and possibly multiple formats if time permits).
The uploaded video is split into segments based on the number of available nodes.
The segments are distributed to the available nodes.
Nodes further divide the video based on the number of transcoder workers available and send the segments to them.
Transcoder workers process the segments into multiple resolutions and bitrates.
The transcoded videos are sent to the uploader worker.
The uploader worker combines or zips them and uploads the final videos to S3.
The system tracks the status of all transcoding tasks, enabling error handling and providing progress updates to clients.

- As the number of users and volume of video uploads increase, the distributed system horizontally scales by adding more nodes to handle the workload.
  If there are many items in the queue that need to be processed new nodes will be spun up to process some of the work.
  If there are very big items in the queue, then what?
- Autoscaling mechanisms dynamically adjust the number of nodes based on utilization to ensure optimal resource allocation and performance.
- As the number of users and volume of video uploads decrease, the distributed system shuts down nodes that aren’t being utilized / are underutilized after they finish all work they are currently doing.

## Transcoder Container Failure and Recovery

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
