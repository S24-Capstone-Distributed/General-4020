# Scope and Use Cases

> *Define the scope of your development and what you will deliver in terms of use cases. List all the use cases you will be supporting. Link to the workflow diagrams when appropriate. Do not forget about error cases, which will include node and service failures and the recovery that is expected.*

The scope of our project is to provide a way for clients to upload data objects and then retrieve those objects. We will provide a REST API with a PUT method to allow users to upload a file and a GET method to allow users to retrieve a file. 

Files will be sharded and replicated across multiple storage nodes. this will provide many benefits including:

- Data durability in case of node/drive failure.

- Data availability in case of node or network failure.

- Increased storage capability and scalability.

- Increased bandwidth and number of concurrent users.


