import "dotenv/config";
import mongoConnection from "../config/dbConfig.js";
import { ObjectId } from "mongodb";

const dbConnection = await mongoConnection(process.env.CONNECTION_STRING);
const postsCollection = dbConnection.db("instabytes").collection("posts");

export async function getAllPosts() {
    return postsCollection.find().toArray();
}

export async function getPostById(id) {
    const objectId = ObjectId.createFromHexString(id);
    return postsCollection.findOne({ _id: new ObjectId(objectId) });
}

export async function createPost(post) {
    return postsCollection.insertOne(post);
}

export async function updatePostById(id, post) {
    const objectId = ObjectId.createFromHexString(id);
    return postsCollection.updateOne(
        { _id: new ObjectId(objectId) },
        { $set: post },
    );
}

export async function removePostById(id) {
    const objectId = ObjectId.createFromHexString(id);
    return postsCollection.deleteOne({ _id: new ObjectId(objectId) });
}