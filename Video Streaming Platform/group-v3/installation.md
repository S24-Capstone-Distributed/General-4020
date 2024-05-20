# Deployment Instructions

## Requirements
- Every device must be on the same network and have Docker running.

## Setup Instructions

1. **Download the deployment folder** in the project directory.

2. **Configure Environment Variables**:
   - In each `.yml`, set the `RABBITMQ_HOST` environment variable to the IP address of the computer that will host the RabbitMQ middleman.
   - In each `.yml`, set the `AWS_ENDPOINT` environment variable to the IP address of the computer that will host the Object Store.
   - In the `mongoapi` folder:
     - In the `.yml`, set the `spring_data_mongodb_host` environment variable to the IP address of the computer that will host the MongoDB instance.
   - In the `upload` folder, within the `mongoapi` folder:
     - In the `.yml`, set the `MONOGO_BASE_URL` environment variable to the IP address of the computer that will host the Spring API instance.

3. **Pull Docker Images**:
   - Navigate to each folder in the command line and run:
     ```sh
     docker compose pull
     ```

4. **Start and Stop Services**:
   - In the `mongoapi` folder:
     - To start the service, run:
       ```sh
       docker compose up
       ```
     - To shut down the service, run:
       ```sh
       docker compose down
       ```

   - If you are hosting the RabbitMQ instance, in the `rabbitmq` folder:
     - To start the RabbitMQ service, run:
       ```sh
       docker compose -f rabbitmq.yml up
       ```
     - To shut down the service, run:
       ```sh
       docker compose down
       ```

5. **Set Up Docker Swarm**:
   - Run the following command to initialize Docker Swarm:
     ```sh
     docker swarm init
     ```

6. **Deploy Streaming and Upload Instances**:
   - In the `streaming` and `upload` folders, deploy the services by running:
     ```sh
     docker stack deploy -c deployment.yml myapp
     ```
     Replace `myapp` with a unique name for each service.

   - To shut down each instance, run:
     ```sh
     docker stack rm myapp
     ```
     Replace `myapp` with the name you used when starting the service.
