# Scope and Use Cases

> *Define the scope of your development and what you will deliver in terms of use cases. List all the use cases you will be supporting. Link to the workflow diagrams when appropriate. Do not forget about error cases, which will include node and service failures and the recovery that is expected.*

Scope:
  Our API is the same as S3's API thus allowing clients to utilize a standard S3 client to interact with our system. 
  We provide two use cases for the client:
    - PUT (**Upload** a data object **to** our system)
    - GET (**Retrieve** a data object **from** our system)
  Our scope to the larger system is that of a Distributed Object Storage System. We are only meant to provide the storage mechanism for our system's video files.

Error Cases:
  Nodes may fail, so we utilized replication of data across multiple storage nodes.
  This provided the benefits:
    1. Data durability in case of node/drive failure.
    2. Data availability in case of node or network failure.
    3. Increased storage capability and scalability.
    4. Increased bandwidth and number of concurrent users.

  1) Data will not be lost within our system because it will have been replicated amongst multiple storage nodes. If one node goes down then others will replicate its files to other nodes.
  2) Because the data is on multiple nodes it will be available. So when a user wants to GET or PUT and object that would go to a node that is failed, the next node in the hash ring will deal with that request. Also, by utilizing HAProxy to load balance and multiple DataRouter nodes the system is available to handle a multitude of requests from clients at once.
  3) By having the ability to create many nodes to store data we have a system with a lot of scalable storage
  4) By having many DataRouters being load balanced and a scalable storage system we can handle more requests and concurrent users.

New Nodes:
  If a new node is added to the system it will be given a hash and join the hash ring at its location on the ring and have files be replicated to it based on if those files' hashes go to that new node.
  This allows for new nodes to be available within the system for GET requests immediately (for the files it would return to the client).
