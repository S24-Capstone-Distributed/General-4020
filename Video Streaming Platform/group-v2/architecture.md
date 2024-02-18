## Overview

System architecture overview (see [here](workflow.md#workflow-diagram-for-the-standard-processing-of-a-video) for basic use case):

![VideoProcessing_SystemLatest](https://github.com/S24-Capstone-Distributed/General-4020/assets/76976043/c6cbe681-965c-4f6a-a39b-08976bf31d09)

## Components

Video retrieval/pulling (see [here](workflow.md#workflow-diagram-for-puller-failure) for how failure is handled):

![VideoProcessing_RetrievalLatest](https://github.com/S24-Capstone-Distributed/General-4020/assets/76976043/f913f5d2-cf07-42c5-abd6-0b64985ff152)

Video processing (see [here](workflow.md#workflow-diagram-for-transcoder-failure) for how failure is handled):

![VideoProcessing_ProcessingLatest](https://github.com/S24-Capstone-Distributed/General-4020/assets/76976043/5d2d983d-a156-4c12-9169-811f7882a5ee)

Video sending/pushing (see [here](workflow.md#workflow-diagram-for-pusher-failure) for how failure is handled):

![VideoProcessing_SendingLatest](https://github.com/S24-Capstone-Distributed/General-4020/assets/76976043/716dc9d8-1659-42c0-8222-0b61b4ac47db)
