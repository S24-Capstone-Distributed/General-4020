#!/bin/bash

sleep 15
echo "Seeding database"
mongoimport --host "mongodb" --port "27017" --db "tradeServer" --collection "price" --file "./data/priceTableSeedNew.csv" --type csv --headerline
# mongoimport --host "mongodb" --port "27017" --db "tradeServer" --collection "clientHoldings" --file "./data/sampleClientHoldings.csv" --type csv --headerline
# mongoimport --host "mongodb" --port "27017" --db "tradeServer" --collection "marketValue" --file "./data/marketValueSeed.csv" --type csv --headerline

echo "attaching connectors"
cx /tutorials/sink_connector/priceupdatesink.json
cx /tutorials/sink_connector/marketvaluesink.json
status
