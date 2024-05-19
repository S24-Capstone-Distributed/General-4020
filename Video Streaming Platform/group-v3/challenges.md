# Distributed System Design Overview

## Use Cases for Distribution

- Effecient handling of a large volume of concurrent video streams
- High availabilty of streaming service
- Reduced latency of video requests and network throughput
- Quick upload time for videos

## Reasons for Distribution

- One service can only handle so many stream requests at a time severly limiting the scalability of the platform
- In a system without distribution, if one part breaks, the whole thing stops working. Distribution helps avoid this by spreading the work across many parts or nodes.
- Having multiple instances of the video service can decrease latency because those servers can store video chunks in advance and for future use.

## Distributed System Challenges 

1. **Fault Detection and Recovery**
   - P: Detecting when cache servers go down and send the requests to other servers
   - A: Heartbeat for detection and using the load balancer to divert requests to other servers while new ones are instantiated. This is done using our server side events module, if it does not hear an update by a timeout set by the user the node is marked as failed.
   
2. **High Availability**
   - P: Ensuring a video can alway be streamed even if the latency takes a hit
   - A: A second load balancer watching the first to take over on failure and any cache server can serve any video. HAproxy is what we use as a load balance to ensure reliability.
   
3. **Load Balancing**
   - P: Distribution of requests to caches servers to ensure reduced latency and lower network usage
   - A: Using a Combination of sharding and request count per server to drive the video request to a cache serve that is most likely to already have it. Also done by HAproxy.
