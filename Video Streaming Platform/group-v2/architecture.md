## Overview

System architecture overview (see [here](workflow.md#client-requests-processing-of-video) for basic use case; for how autoscaling works, see [here](workflow.md#autoscaling-workflow)):

![SimplifiedC4](https://github.com/S24-Capstone-Distributed/General-4020/assets/76976043/91c3dddd-9ecb-4c52-9ea0-cb72e1807114)

One level deeper:

![VideoProcessing_FINAL_Overview](https://github.com/S24-Capstone-Distributed/General-4020/assets/76976043/fbf2ba4e-dc79-440b-8e28-e47d5efc6287)

## Components

See [here](workflow.md#error-handling-functional-container-error) and [here](workflow.md#error-handling-container-failure) for how the general two types of failure are dealt with.

Video retrieval/pulling:

![VideoProcessing_RetrievalLatest](https://github.com/S24-Capstone-Distributed/General-4020/assets/76976043/b05563cd-246d-4c9b-a98a-60dd51e585f8)

Video processing:

![VideoProcessing_ProcessingLatest](https://github.com/S24-Capstone-Distributed/General-4020/assets/76976043/d9dc2ef0-5d2c-4a33-86d0-8c9a87c71278)

Video sending/pushing:

![VideoProcessing_SendingLatest](https://github.com/S24-Capstone-Distributed/General-4020/assets/76976043/4791eea9-5486-4be3-8085-7b4951809116)
