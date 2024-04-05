# Use the official MongoDB image from Docker Hub
FROM mongo:latest


ENV MONGO_INITDB_DATABASE=tradeServer

# Set the working directory in the container
WORKDIR /usr/src/configs

# Make the seed script executable


# Expose ports (default MongoDB port is 27017)
EXPOSE 27017

CMD ["mongod"]
