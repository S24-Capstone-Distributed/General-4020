# Video transcoding and segmentation

**Team Members:** [Ephraim Crystal](mailto:ecrysta1@mail.yu.edu), [Lawrence Snow](mailto:lsnow@mail.yu.edu), [Yonatan Reiter](mailto:yreiter@mail.yu.edu)

## Project Plan

- [System Overview](System%20Overview.pdf)
- [Getting Started Guide](Getting%20Started%20Guide.pdf)
- [Scope and Use Cases](scope.md)
- [Distributed System Challenges](challenges.md)
- [Workflow Diagrams (BPMN)](workflow.md)
- [Software Architecture Diagrams (C4)](architecture.md)
- [Tools & Technologies](technologies.md)

## Overview

When watching a video on YouTube, the video quality is dynamically adjusted based on the viewer's internet bandwidth to ensure the smoothest possible viewing experience. We set out to create a system that replicates this functionality. Videos have to be prepared to be streamed in such a manner. This preparation entails transcoding videos into multiple resolutions and bitrates to provide options for our clients depending on their bandwidth. Our project focuses on this preparation aspect.

A [task orchestrator](https://github.com/S24-Capstone-Distributed/V3) send us requests to transcode videos stored in an [object store](https://github.com/S24-Capstone-Distributed/V1). We retrieve the relevant videos from the object store, transcode them into various resolutions and bitrates as specified in the request, and upload the final results back to the object store. We do all of this in a highly distributed manner, concurrently handling the processing of many video files and auto-scaling as necessary. Throughout this process, we log status updates to a database and publish them to a message bus.
