// const { MongoClient } = require("mongodb");
import { MongoClient } from "mongodb"
import { Kafka } from "kafkajs";
import { handleClientHoldingUpdate, handlePriceUpdate, populatePriceMap, populateHoldingsMap } from "./utils.js";
// Replace the uri string with your connection string.
const uri = process.env.MONGO_CONNECTION_URI;
console.log(uri, process.env.KAFKA_URL);
const client = new MongoClient(uri);

const kafka = new Kafka({
    clientId: "market-value-calculator",
    brokers: [process.env.KAFKA_URL],
});

const consumer = kafka.consumer({ groupId: "market-value-group" });
console.log("Created consumer")
await consumer.connect();
console.log("Connected")
await consumer.subscribe({ topics: [process.env.PRICE_TOPIC, process.env.CLIENT_HOLDING_TOPIC] /*, fromBeginning: true */ });
console.log("Subscriibed")
const producer = kafka.producer();
console.log("Created producer");
await producer.connect();
console.log("Connected to producer");

// Populate the priceMap with the initial prices
const priceMap = {};
await populatePriceMap(client, priceMap)

/**
 * holdingsMap will keep client holdings in memory so that we dont need to query the db everytime
 * {
 *  ticker: {clientID: holding}
 * }
 */
const holdingsMap = {}
await populateHoldingsMap(client, holdingsMap)

await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        console.log({
            topic: topic,
            key: message.key ? message.key.toString() : "NO KEY",
            value: message.value ? message.value.toString() : "NO VALUE",
            headers: message.headers,
        });
        if (topic == process.env.PRICE_TOPIC) {
            handlePriceUpdate(priceMap, holdingsMap, JSON.parse(message.value), producer)
        } else if (topic == process.env.CLIENT_HOLDING_TOPIC) {
            handleClientHoldingUpdate(priceMap, holdingsMap, JSON.parse(message.value), producer)
        }
    },
});
