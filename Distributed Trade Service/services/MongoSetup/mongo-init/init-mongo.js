// Switch to QueryDB and do the same
db = db.getSiblingDB('QueryDB');

db.createCollection("clientPortfolio");
db.clientPortfolio.insertOne({ clientID: "exampleClientId", stockID: "exampleStockId", quantityOwned: 11, timestamp: new Date(), lastUpdated: new Date() });


db.createCollection("transactions");
db.transactions.insertOne({ txnID: "exampleTxnIdYY", clientID: "exampleClientId", stockID: "exampleStockId", quantity: 5, buySell: "buy", price: 150.60, timestamp: new Date(), lastUpdated: new Date() });
