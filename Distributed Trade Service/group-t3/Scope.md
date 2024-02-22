# Scope and Use Cases

### Accepting Stock Price Updates

**Description:**
This section describes the functionality of the system regarding the acceptance of stock price updates from various data sources.

**Trigger:**
Stock price updates are received from data sources via the provided API endpoint.

**Basic Flow:**
1. Data sources send stock price updates to the designated API endpoint.
2. The message queue receives the updates and publishes them to the appropriate topic
3. The compacted view of the topic is updated to reflect the new message


**Postcondition:**
The compacted view of the stock price is updated with the latest stock price information, ensuring data accuracy and consistency.

---

### Providing a Realtime View of Stock Prices

**Description:**
This section outlines how the system provides a realtime view of stock prices to clients.

**Trigger:**
Clients request stock price information via the provided API endpoint.

**Basic Flow:**
1. Clients send requests for stock price information to the designated API endpoint.
2. The server handling the requests  retrieves the data from the compacted view of the relevant topics.
3. Retrieved data is formatted and sent back to the clients in realtime.
4. Clients receive and display the realtime stock price information.



**Postcondition:**
Clients receive and display the requested realtime stock price information, facilitating informed decision-making.

---

### Providing a Framework for Managing an In-Memory Cache

**Description:**
This section describes the framework provided by the system for managing an in-memory cache on client machines to enhance throughput and reduce network requests.

**Trigger:**
Clients retrieve stock price information using the provided package of code.

**Basic Flow:**
1. Clients utilize the provided package of code to retrieve stock price information.
2. The package manages an in-memory cache on the client machine and pro-actively fetches frequently accessed stock price data.
3. When clients request stock price information, the system first checks the cache.
4. If the requested data is available in the cache, it is returned to the clients directly from the cache, reducing network requests.
5. If the requested data is not available in the cache, the system retrieves it from the database, updates the cache, and returns the data to the clients.

**Alternative Flow:**
- If the cache is full or exceeds a predefined threshold, the system may employ cache eviction strategies to make room for new data.

**Postcondition:**
Clients benefit from improved throughput and reduced network requests due to the efficient management of an in-memory cache, enhancing overall system performance.

