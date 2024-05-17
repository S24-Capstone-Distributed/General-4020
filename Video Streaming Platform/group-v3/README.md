# Client interactions and adaptive streaming

**Team Members:** [Gadi Polster](mailto:gpolster@mail.yu.edu), [Eitan Remer](mailto:eremer@mail.yu.edu), [Chaim Schwartz](mailto:cschwar1@mail.yu.edu)

## Project Description

- [Scope and Use Cases](scope.md)
- [Distributed System Challenges](challenges.md)
- [Workflow Diagrams (BPMN)](workflow.md)
- [Software Architecture Diagrams (C4)](architecture.md)
- [Tools & Technologies](technologies.md)
- [Installation Instructions](installation.md)
- [API Documentation](api.md)

## Overview

_Provide a short introduction, summary and functional overview of what your project group is trying to achieve and implement. Give the context within the greater system and application._

The goal of our project is to act as a middleman between the client and the backend. Clients will be able to log on to a website we create, upload a video, watch the progress of the upload, and stream other videos as well as their own in 3 different bitrates.

With each video uploaded, our program performs a number of actions before handing it off to V2 for transcoding and storing in the database created by V1. The video first goes through our upload service that is listening for videos, next we partition the code according to specifications provided by V2. After storing the raw video and current metadata in their respective databases, each video partition (in all three bitrates) is then queued onto a RabbitMQ to be dealt with by V2. Once that process is complete the user will be notified and can carry on as they please.

For the download, A user is first provided with a list of videoa currently stored in the database ready for streaming. Once they choose a video, they are routed to a server based on our load balancer. From there we have a CDN service that will be caching the video and loading the upcoming segments of the video to reduce buffering for the current streamer. This process also serves the benefit of having the video ready for other users who would like to watch the same video.
