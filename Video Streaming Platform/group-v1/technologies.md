# Tools & Technologies

## Coding Language: Java
- Familiarity and ease of use with JUnit, Maven, etc

## Testing: JUnit
- Familiarity with the testing capabilities of JUnit
- Used side-by-side with Java
  
## Project setup and integration: Maven
- Familiarity and ease of use
- Powerful package and project tool
  
## Software Tools: S3 AWS CLI
- **link**: https://www.bing.com/ck/a?!&&p=094012c9f504f432JmltdHM9MTcwOTA3ODQwMCZpZ3VpZD0yZTg1OGVlYS02MmRjLTYwNjUtMjgwYS05ZTk3NjNiODYxZDMmaW5zaWQ9NTIxMA&ptn=3&ver=2&hsh=3&fclid=2e858eea-62dc-6065-280a-9e9763b861d3&psq=What+is+the+S3+CLI&u=a1aHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL2NsaS9sYXRlc3QvdXNlcmd1aWRlL2NsaS1zZXJ2aWNlcy1zMy5odG1s&ntb=1
- The S3 CLI (Command Line Interface) is a powerful tool provided by Amazon Web Services (AWS) for managing and interacting with Amazon Simple Storage Service (S3).
- Here are some key points about the S3 CLI:
  1. High-Level Commands:
    - The S3 CLI offers high-level commands that simplify common tasks related to S3, such as creating, manipulating, and deleting objects and buckets.
    - These commands are designed to be user-friendly and abstract away the underlying complexity of S3 operations.
  2. Path Arguments:
    - Whenever you use an S3 CLI command, you need to specify at least one path argument.
    - Here are two types of path arguments:
      1) LocalPath: Represents the path of a local file or directory on your system.
      2) S3Uri: Represents the location of an S3 object, prefix, or bucket.
        - The S3Uri format is s3://mybucket/mykey, where mybucket is the specified S3 bucket and mykey is the specified S3 key.
        - Prefixes within buckets are separated by forward slashes (e.g., myprefix/myobject).
        - S3Uri also supports S3 access points (e.g., s3://<access-point-arn>/<key>).
  3. Order of Path Arguments:
    - Every command takes one or two positional path arguments.
    - The first path argument represents the source (local file/directory or S3 object/prefix/bucket).
    - If there’s a second path argument, it represents the destination (local file/directory or S3 object/prefix/bucket).
  4. Single File and Object Operations:
    - Some commands operate only on single files and S3 objects (e.g., cp, mv, rm).
    - If no --recursive flag is provided, these commands work on individual files/objects.
    - The source must exist and be a local file or S3 object.
    - The destination can be a local file, local directory, S3 object, S3 prefix, or S3 bucket.
    - The use of a trailing slash in the destination indicates a local directory or S3 prefix.
  5. Examples of S3 CLI Commands:
    - To upload a local file to S3: aws s3 cp localfile.txt s3://mybucket/myobject
    - To move an S3 object to a different location: aws s3 mv s3://mybucket/myobject s3://mybucket/newprefix/myobject
    - To delete an S3 object: aws s3 rm s3://mybucket/myobject

## Container: Docker
  1. Isolation and Consistency: Docker containers encapsulate applications and their dependencies, ensuring consistent behavior across different environments. This isolation prevents conflicts between software components.
  2. Portability: Containers can run consistently on any platform that supports Docker, whether it’s your local development machine, a cloud server, or a production environment. This portability simplifies deployment and reduces compatibility issues.
  3. Efficient Resource Utilization: Docker containers share the host OS kernel, which makes them lightweight. Unlike virtual machines (VMs), containers don’t require a full OS stack for each instance, leading to better resource utilization.
  4. Rapid Deployment: Docker allows you to create, start, and stop containers quickly. This agility is essential for modern development practices like continuous integration and continuous deployment (CI/CD).
  5. Scalability: Docker containers can be easily scaled horizontally by spinning up multiple instances. This flexibility enables efficient handling of varying workloads.
  6. Version Control: Docker images are versioned, allowing you to track changes and roll back to previous versions if needed. This version control simplifies software maintenance.
  7. Ecosystem and Community: Docker has a vast ecosystem with pre-built images available on Docker Hub. The community actively contributes to maintaining and improving these images.
  8. DevOps Integration: Docker integrates seamlessly with DevOps tools, making it easier to automate deployment, testing, and monitoring processes.

## Coordination and Node control: ZooKeeper
1. What is Apache ZooKeeper?
  1) Apache ZooKeeper is a distributed, open-source coordination service designed to simplify the development and management of distributed applications.
  2) It provides a centralized place where distributed processes and services can store data, communicate, and coordinate their activities.
  3) ZooKeeper exposes a simple set of primitives that higher-level services can use for synchronization, configuration maintenance, group management, and naming.
2. Why Do We Need ZooKeeper?
  1) In a distributed system, multiple nodes or machines need to communicate and coordinate their actions.
  2) Implementing coordination services from scratch is complex and prone to errors (e.g., race conditions, deadlocks).
  3) ZooKeeper simplifies coordination by providing a consistent and reliable way for nodes to be aware of each other and work together.
3. Key Features of ZooKeeper:
  1) Hierarchical Data Model: ZooKeeper organizes data in a tree-like structure called Znodes. These Znodes store information and maintain state.
  2) Primitives: ZooKeeper offers primitives like locks, barriers, and queues for coordination.
  3) Leader Election: ZooKeeper helps elect a leader among distributed nodes.
  4) Failover and Recovery: It ensures system resilience by handling failover scenarios.
4. Challenges in Distributed Systems and Why Coordination Is Hard:
  1) Coordination Challenge: Coordinating multiple systems in a distributed application.
  2) Single Point of Failure: Traditional master-slave architecture has a single point of failure (the master node).
  3) Synchronization Complexity: Ensuring synchronization across distributed nodes is not straightforward.
  4) Design and Implementation: Careful design and implementation are necessary.
5. Use Cases and Applications:
  1) Hadoop: ZooKeeper coordinates Hadoop’s distributed components.
  2) Kafka: Kafka brokers use ZooKeeper for leader election and topic management.
