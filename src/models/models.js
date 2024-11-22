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









// export async function getPostById(id) {
//     return postsCollection.findOne({ _id: id });
// }

// export async function getPostByWord(word) {
//     return postsCollection.find({ $text: { $search: word } }).toArray();
// }

// export async function createPost(post) {
//     return postsCollection.insertOne(post);
// }

// export async function updatePost(post, updatePost) {
//     return postsCollection.updateOne(
//         post,
//         { $set: updatePost },
//     );
// }

// export async function replacePostByWord(post, newPost) {
//     return postsCollection.replaceOne(
//         post,
//         newPost,
//     );
// }

// export async function deletePost(post) {
//     return postsCollection.deleteOne(post);
// }


export async function getAllUsers() {
    // access users's collection
    const usersCollection = dbConnection.db("instabytes").collection("users");

    // return all documents of collection into array type
    return usersCollection.find().toArray();
}