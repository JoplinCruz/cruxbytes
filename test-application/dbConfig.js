import { MongoClient } from "mongodb";

export async function mongoDbConnection(ConnectionPath) {
    let mongoClient;
    try {
        mongoClient = new MongoClient(ConnectionPath);
        console.log("Connecting to Server...");
        await mongoClient.connect();
        console.log("Successful connection to Atlas MongoDB");
        return mongoClient;
    } catch (error) {
        console.error("Database connection error", error);
        process.exit();
    }
}