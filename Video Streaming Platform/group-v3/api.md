# Controller Package (com.example.mongodbdemo.controller)

## TaskController Class

This class is responsible for handling HTTP requests related to tasks.

### Methods:

1. `streamTaskUpdates()`:
   - **Description:** Establishes a server-sent event (SSE) stream for sending task update events to clients.
   - **Returns:** A Flux of ServerSentEvent<String> containing task update events.

2. `getAllTasks()`:
   - **Description:** Retrieves all tasks.
   - **Returns:** A List of Task objects.

3. `getTasksByJobId(String jobId)`:
   - **Description:** Retrieves tasks by job ID.
   - **Parameters:**
     - `jobId`: The ID of the job.
   - **Returns:** A List of Task objects filtered by the provided job ID.

4. `getTaskByTaskId(String taskId)`:
   - **Description:** Retrieves a task by its ID.
   - **Parameters:**
     - `taskId`: The ID of the task.
   - **Returns:** The Task object with the provided ID.

5. `addTask(Task task)`:
   - **Description:** Adds a new task.
   - **Parameters:**
     - `task`: The Task object to be added.
   - **Returns:** The added Task object.

6. `getAllTaskUpdates()`:
   - **Description:** Retrieves all task updates.
   - **Returns:** A List of TaskUpdate objects.

7. `updateTask(String taskId, TaskUpdateRequest updateRequest)`:
   - **Description:** Updates a task with the provided ID.
   - **Parameters:**
     - `taskId`: The ID of the task to be updated.
     - `updateRequest`: An object containing update information (EventType, EventName, TaskStatus, requeueNum).
   - **Returns:** The updated TaskUpdate object.

# Service Package (com.example.mongodbdemo.service)

## TaskService Class

This class manages task updates and provides methods for emitting and subscribing to task updates.

### Methods:

1. `emitTaskUpdate(TaskUpdate task)`:
   - **Description:** Emits a task update.
   - **Parameters:**
     - `task`: The TaskUpdate object to be emitted.

2. `getTaskUpdates()`:
   - **Description:** Retrieves a Flux of task updates.
   - **Returns:** A Flux of TaskUpdate objects.

# Repository Package (com.example.mongodbdemo.repository)

## TaskRepository Interface

This interface defines methods for interacting with the Task collection in the MongoDB database.

### Methods:

1. `findByJobId(String jobId)`:
   - **Description:** Finds tasks by job ID.
   - **Parameters:**
     - `jobId`: The ID of the job.
   - **Returns:** A List of Task objects filtered by the provided job ID.

2. `findByTaskId(String taskId)`:
   - **Description:** Finds a task by its ID.
   - **Parameters:**
     - `taskId`: The ID of the task.
   - **Returns:** The Task object with the provided ID.

## TaskUpdateRepository Interface

This interface defines methods for interacting with the TaskUpdate collection in the MongoDB database.

### Methods:

1. `findAll()`:
   - **Description:** Finds all task updates.
   - **Returns:** A List of TaskUpdate objects.

2. `save(TaskUpdate taskUpdate)`:
   - **Description:** Saves a task update.
   - **Parameters:**
     - `taskUpdate`: The TaskUpdate object to be saved.
   - **Returns:** The saved TaskUpdate object.

# FileUploadController Class

This class handles file upload requests.

### Methods:

1. `handleFileUpload(MultipartFile file)`:
   - **Description:** Handles file upload requests by saving the uploaded file to a specified directory.
   - **Parameters:**
     - `file`: The MultipartFile representing the uploaded file.
   - **Returns:** A message indicating the status of the file upload process.

### Private Methods:

1. `createUploadDirectory(String directory)`:
   - **Description:** Creates the directory to store uploaded files if it doesn't exist.
   - **Parameters:**
     - `directory`: The name of the directory to be created.
   - **Throws:** IOException if an I/O error occurs when creating the directory.
