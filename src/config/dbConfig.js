import { MongoClient } from "mongodb";

export default async function mongoConnection(connectionString) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(connectionString);
        console.log("Connecting to database cluster...");
        await mongoClient.connect();
        console.log("Success! Atlas MongoDB's connected.");

        return mongoClient;
    } catch (error) {
        console.error("Database connection error: ", error);
        process.exit();
    }
}