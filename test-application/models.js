
import { ObjectId } from "mongodb";
import { mongoDbConnection } from "./dbConfig";

const connectionDB = mongoDbConnection("connectionPathHere");
const posts = connectionDB.db("project").collection("posts");

export async function getAllPosts() {
    return posts.find();
}

export async function getPostById(id) {
    const objId = ObjectId.createFromHexString(id);
    return posts.findOne({ _id: new ObjectId(objId) });
}

export async function createPost(post) {
    return posts.insertOne(post);
}

export async function updatePostById(id, post) {
    const objId = ObjectId.createFromHexString(id);
    return posts.updateOne(
        { _id: new ObjectId(objId) },
        { $set: post }
    );
}

export async function removePost(id) {
    const objId = ObjectId.createFromHexString(id);
    return posts.deleteOne({ _id: new ObjectId(objId) });
}