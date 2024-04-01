# Use the official MongoDB image from Docker Hub
FROM mongo:latest

ENV MONGO_INITDB_DATABASE=TradeServer

# Set the working directory in the container
WORKDIR /usr/src/configs

# Copy the seed script into the Docker image
COPY seed.sh .

# Copy the CSV data into the Docker image
RUN mkdir ./data
COPY priceTableSeed.csv ./data/priceTableSeed.csv

# Make the seed script executable
RUN chmod +x seed.sh

# Expose ports (default MongoDB port is 27017)
EXPOSE 27017


# Run the seed script when the container starts
CMD ["./seed.sh"]
