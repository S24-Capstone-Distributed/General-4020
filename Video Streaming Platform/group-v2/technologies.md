# Technologies Used in the Project

## Java
- **Reason for Use:** Extensive familiarity and expertise with it combined with time constraints and need for efficient progress, robust ecosystem and extensive libraries that offer a wealth of resources to expedite development tasks.
- **Considered Alternatives:** Python, due to its simplicity and suitability for AWS S3 interactions. However, lack of team expertise and potential longer development time led to the decision not to use it, especially given our time constraints.

## JUnit and Maven
- **Reason for Use:** JUnit facilitates robust and automated unit testing and smoothly integrates with Maven for streamlined project setup and dependency management, extensive familiarity and experience with both.
- **Considered Alternatives:** None, as JUnit and Maven are widely adopted and well-suited for Java projects.

## Docker
- **Reason for Use:** Lightweight containerization, consistent deployment across environments, minimal setup.
- **Considered Alternatives:** Other containerization solutions, but Docker's ease of use and popularity made it the preferred choice.

## Kubernetes
- **Reason for Use:** Orchestration and management of containerized services for scalability and resilience, offers us full control over system's deployment, scaling, and maintenance.
- **Considered Alternatives:** Other orchestration tools, but Kubernetes' extensive features and community support made it the preferred choice.

## RabbitMQ
- **Reason for Use:** Reliable messaging system with support for various messaging patterns.
- **Considered Alternatives:** Apache Kafka, but RabbitMQ's simplicity and seamless integration with Java favored its selection.

In managing communication between our distributed components, we integrated RabbitMQ as our messaging system. RabbitMQ's reliability, flexibility, and support for various messaging patterns made it an ideal choice for our project. Its robust message queuing mechanism ensured reliable message delivery, even in the face of network failures or service outages. Additionally, RabbitMQ's seamless integration with Java and support for industry-standard protocols simplified integration with our existing infrastructure, offering a smooth and efficient messaging solution over alternatives. While RabbitMQ excels in scenarios requiring traditional message queuing patterns, such as task distribution and RPC-style communication, other technologies like Apache Kafka provide alternatives for scenarios where high throughput and real-time processing are paramount. However, RabbitMQ's simplicity, ease of integration with Java, and out-of-the-box support for various messaging patterns make it a preferred choice for our project, which prioritizes rapid development and ease of use. 

## h264 Codec
- **Reason for Use:** Longevity, widespread device compatibility, extensive support, and ease of use.
- **Considered Alternatives:** Newer codecs like VP9, but their relative novelty and limited device support posed potential risks.

In our exploration of video processing, the complexities of adaptive bitrate streaming codecs have become a focal point. Anticipating challenges in developing the distributed aspect of our system, we've embraced a strategy of simplicity for the initial phases to minimize potential errors and streamline debugging. As part of this strategy, we deliberated on various codec options and ultimately opted to commence with the h264 codec, which is renowned for its longevity, widespread device compatibility, extensive support, and ease of use. While we also considered newer codecs like VP9, which may offer enhanced efficiency, their relative novelty and limited device support introduce potential risks. By prioritizing the tried-and-tested h264 codec, we mitigate these risks and establish a robust starting point for our project.

## HLS (HTTP Live Streaming)
- **Reason for Use:** Simplicity in implementation and widespread native support across devices and platforms.
- **Considered Alternatives:** DASH (Dynamic Adaptive Streaming over HTTP), but HLS aligned closely with current priorities and offered ease of setup and compatibility.

In the realm of adaptive bitrate streaming protocols, HLS (HTTP Live Streaming) and DASH (Dynamic Adaptive Streaming over HTTP) are prominent contenders, each offering distinct advantages and considerations. HLS, known for its simplicity in implementation and widespread native support across devices and platforms, emerges as the pragmatic choice for our project's initial stages. The ease of setup and compatibility of HLS align closely with our current priorities, allowing us to focus on resolving challenges inherent in the distributed system architecture without being encumbered by protocol intricacies. While DASH may offer advantages such as lower latency and broader codec support, its implementation complexity and potential compatibility issues could divert valuable resources away from addressing core development concerns. By opting for HLS at the outset, we can streamline our development process, minimize integration challenges, and ensure smoother progress in the early stages of our project. As our system matures and requirements evolve, we can reassess the suitability of DASH or other protocols to meet our evolving needs.

## FFmpeg
- **Reason for Use:** Comprehensive multimedia processing tools for efficient video segmentation and transcoding.
- **Considered Alternatives:** GStreamer, HandBrake, Libav, but FFmpeg's versatility, robustness, and widespread acceptance made it the preferred choice.

In our project, the imperative need for efficient video segmentation and transcoding drove us to integrate FFmpeg into our technology stack. FFmpeg's comprehensive suite of multimedia processing tools provided us with the flexibility and functionality required to seamlessly handle various video processing tasks. Its robust capabilities for video segmentation and transcoding enabled us to customize the processing pipeline to precisely meet our specific requirements, ensuring optimal performance and output quality. Moreover, FFmpeg's extensive adoption and active community support instilled confidence in its reliability and stability for managing video processing tasks at scale. While alternatives like GStreamer, HandBrake, and Libav offer similar functionalities, FFmpeg stood out as the best fit for our use case due to its unmatched versatility, robustness, and widespread acceptance within the video processing community. Leveraging FFmpeg, we were able to streamline our video processing workflows, enhancing both efficiency and scalability within our system.

## DynamoDB
- **Reason for Use:** Simplicity, ease of management, key-value database, and alignment with AWS ecosystem.
- **Considered Alternatives:** Apache Cassandra, Apache HBase, Google Cloud Bigtable, but DynamoDB's simplicity, manageability, and familiarity with AWS services favored its selection.

For our logging needs, we extensively evaluated several database options including Apache Cassandra, Apache HBase, and Google Cloud Bigtable. However, we ultimately decided to utilize DynamoDB to store our logs due to several key factors.

Firstly, DynamoDB's simplicity and ease of management align well with our project's timeline and our team's existing expertise with AWS services. Leveraging DynamoDB allows us to rapidly set up and manage our logging infrastructure without significant overhead or learning curve. Additionally, DynamoDB's fully managed nature reduces operational overhead, enabling us to focus more on developing our project rather than managing database infrastructure.

Furthermore, the type of data we're storing, which essentially involves mapping task ID to progress logs, works perfectly with a key-value database model. This means that a relational database would introduce unneeded complexity, reinforcing the suitability of DynamoDB for our use case.

While alternatives like Apache Cassandra and HBase offer powerful features, their setup and management complexity, as well as the learning curve associated with them, would have posed challenges given our project's time constraints. Additionally, we are already using AWS S3 for testing purposes while awaiting database setup by another team due to its simplicity. Thus, by using DynamoDB, we maintain consistency within the AWS ecosystem, leveraging familiar tools and services to expedite development without introducing additional complexity associated with cross-cloud deployments.

Overall, DynamoDB's simplicity, manageability, and alignment with our existing AWS experience make it the optimal choice for our logging infrastructure, enabling us to efficiently capture and analyze logs while meeting project deadlines.

### File Transfer Approach in Kubernetes Pods

- **Decision:** Utilize the local file system within the pod for file transfer between containers.
- **Reasoning:**
  - Faster performance, particularly for large files, by avoiding TCP overhead.
  - Minimizes network latency and streamlines development process.
- **Considered Alternatives:**
  - TCP communication between containers within the pod, which could introduce additional network overhead and latency.

In determining the approach for transferring files within our Kubernetes pods, we carefully weighed the options to optimize performance and efficiency. Ultimately, we decided to utilize the local file system within the pod for file transfer between containers. This decision was driven by several factors. First, transferring files via the local file system can offer faster performance, particularly for larger files, by avoiding the overhead of encoding and decoding data for transmission over TCP. Additionally, leveraging the local file system minimizes network latency, which will make file transfer times be shorter. Furthermore, using the local file system streamlines the development process by bypassing some of the overhead associated with container orchestration, such as scheduling and inter-container communication. 
