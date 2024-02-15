# Technologies Used in the Project

## Java
- **Reason for Use:** Extensive familiarity and expertise with Java within the team in addition to Java's robust ecosystem and extensive libraries that offer a wealth of resources to expedite development tasks.
- **Considered Alternatives:** Python, due to its simplicity and suitability for AWS S3 interactions. However, lack of team expertise and potential longer development time led to the decision not to use it.

In our project, we opted to utilize Java as our primary programming language due to our team's extensive familiarity and expertise with it. Given the time constraints and the need for efficient progress, leveraging Java provided us with a streamlined development process, allowing us to focus on implementation rather than grappling with the learning curve of a new  or only semi-familiar language. Additionally, Java's robust ecosystem and extensive libraries offered a wealth of resources to expedite development tasks.

We considered using Python, as in some ways it is simpler, especially in regard to pulling/pushing files to and from AWS S3, which is the storage service we are testing our system with. However, given that we don’t know Python as well, and it would’ve taken longer to write code in Python, we decided not to use it given the time constraints of this project.

## JUnit and Maven
- **Reason for Use:** Robust and automated testing facilitated by JUnit, integrated with Maven for streamlined project setup and dependency management.
- **Considered Alternatives:** None, as JUnit and Maven are widely adopted and well-suited for Java projects.

In our project, we rely on JUnit for robust and automated testing of our Java codebase. JUnit offers a simple and effective framework for writing and executing unit tests, allowing us to validate individual components in isolation. By adopting test-driven development practices facilitated by JUnit, we ensure the reliability and correctness of our codebase, mitigating the risk of regressions as we iterate on our software. Furthermore, JUnit integrates seamlessly with our build and dependency management tool, Maven. Maven's declarative approach to project configuration and dependency resolution simplifies project setup and ensures consistent builds across different environments. With Maven, we can easily manage project dependencies, compile our code, run tests, and package our application for deployment, streamlining our development workflow and promoting project scalability and maintainability. Together, JUnit and Maven empower us to deliver high-quality software efficiently, meeting our project goals with confidence.

## Docker
- **Reason for Use:** Lightweight containerization for consistent deployment across environments.
- **Considered Alternatives:** Other containerization solutions, but Docker's ease of use and popularity made it the preferred choice.

## Kubernetes
- **Reason for Use:** Orchestration and management of containerized services for scalability and resilience.
- **Considered Alternatives:** Other orchestration tools, but Kubernetes' extensive features and community support made it the preferred choice.

## RabbitMQ
- **Reason for Use:** Reliable messaging system with support for various messaging patterns.
- **Considered Alternatives:** Apache Kafka, but RabbitMQ's simplicity and seamless integration with Java favored its selection.

## h264 Codec
- **Reason for Use:** Longevity, widespread device compatibility, extensive support, and ease of use.
- **Considered Alternatives:** Newer codecs like VP9, but their relative novelty and limited device support posed potential risks.

## HLS (HTTP Live Streaming)
- **Reason for Use:** Simplicity in implementation and widespread native support across devices and platforms.
- **Considered Alternatives:** DASH (Dynamic Adaptive Streaming over HTTP), but HLS aligned closely with current priorities and offered ease of setup and compatibility.

## FFmpeg
- **Reason for Use:** Comprehensive multimedia processing tools for efficient video segmentation and transcoding.
- **Considered Alternatives:** GStreamer, HandBrake, Libav, but FFmpeg's versatility, robustness, and widespread acceptance made it the preferred choice.

## DynamoDB
- **Reason for Use:** Simplicity, ease of management, and alignment with AWS ecosystem.
- **Considered Alternatives:** Apache Cassandra, Apache HBase, Google Cloud Bigtable, but DynamoDB's simplicity, manageability, and familiarity with AWS services favored its selection.
