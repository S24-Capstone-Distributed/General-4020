# Scope and Use Cases

## Real-time prices
_provide real-time streaming prices and cache_

- We will provide an API endpoint for data sources to send stock price updates
- We will provide an API endpoint for system components to get one or many stock prices
- We will provide a JAR file that allows clients to retrieve stock prices and automatically manages an in-memory cache on the client machine.
- Our system will be highly available such that the failure of several nodes wont prevent clients from being served
- Our system will provide a low-latency view of the price updates as they enter the system. We will conduct testing on industry level software to find a benchmark for throughput.
- The cache framework improve throughput and reduce network requests by reducing the number of spurious requests.
- Our system will be horizontally scalable such that it can ingest data from many sources and provide a consistent view of the data to many clients. We will conduct testing on industry level software to find a benchmark for performance under high demand. 
- Our system will always provide a consistent view of the data with regards to the order that the price updates enter the system. I.e updates to one stock that were sent later wont be available before updates that were sent earlier.
