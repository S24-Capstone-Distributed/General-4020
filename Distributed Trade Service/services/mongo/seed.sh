#!/bin/bash
# # Start MongoDB in the background
mongod --fork --logpath /var/log/mongodb.log

# # Wait for MongoDB to start
sleep 5

# # Import the CSV data into MongoDB
mongoimport --type csv --db tradeServer --collection price --headerline --file ./data/priceTableSeed.csv

# # Shutdown MongoDB
mongod --shutdown

# Start MongoDB in the foreground
mongod
