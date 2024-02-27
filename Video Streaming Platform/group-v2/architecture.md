## Overview

System architecture overview (see [here](workflow.md#client-requests-processing-of-video) for basic use case; for how autoscaling happens see [here](workflow.md#autoscaling-workflow)):

![VideoProcessing_SystemOverview](https://github.com/S24-Capstone-Distributed/General-4020/assets/76976043/d409785e-9d63-46fc-a482-899716af5004)

## Components

See [here](workflow.md#error-handling-functional-container-error) and [here](workflow.md#error-handling-container-failure) for how the general two types of failure are dealt with.

Video retrieval/pulling:

![VideoProcessing_RetrievalLatest](https://github.com/S24-Capstone-Distributed/General-4020/assets/76976043/107f3c53-91bb-4518-839f-ee7df3c75605)

Video processing:

![VideoProcessing_ProcessingLatest](https://github.com/S24-Capstone-Distributed/General-4020/assets/76976043/5b1a4188-c74e-40c3-b795-80ae70b171ab)

Video sending/pushing:

![VideoProcessing_SendingLatest](https://github.com/S24-Capstone-Distributed/General-4020/assets/76976043/dadfd500-9976-4fe3-a608-4c46ef1cdbb7)

Heartbeat system (see [here](workflow.md#gossip-based-heartbeat-protocol-between-containerspods) for the heartbeat workflow):

![VideoProcessing_HeartbeatsC4](https://github.com/S24-Capstone-Distributed/General-4020/assets/76976043/90feb73b-d37d-4202-8f4e-41337aca8514)
