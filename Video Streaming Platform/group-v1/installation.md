# Installation Instructions

### Building the Docker images

From the project root *(Full System/)*, the code should be packaged using the command:

```bash
mvn package
```

Then the docker images can be built using the following commands:

```bash
# Build the Data Router image
docker build DataRouter -t data_router

# Build the Stoage Node image
docker build StorageNode -t storage_node
```

### Running the docker images

#### Data Router

Data router depends on zookeeper and postgres which you must have running before starting the data router. When running the image, expose port 5656 on the desired port.

```bash
docker run -p 5656:5656 data_router
```

#### Storage Node

Storage Node depends on zookeeper which you must have running before starting the data router. The following environment variables should be set:

- **NODE_HOST** The host this node is running on

- **NODE_PORT** The port this node should run on

- **NODE_ID** The id number of this storage node. Must be a unique number.

remember to expose the port you set.

## Docker Compose

I have included a `compose.yaml` file which starts up multiple instances of Data router and storage node as well as Zookeeper, Postgres, and HAProxy. You can start this using  the command `docker compose up`. This file can also be used as an example for how to configure the system to meet your needs.


