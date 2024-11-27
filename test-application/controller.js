import fs from "fs";
import { createPost, getAllPosts, getPostById, removePost, updatePostById } from "./models";
import generateDescriptionWithGemini from "../src/services/geminiService";


export async function getAll(req, res) {
    try {
        const posts = await getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export async function getById(req, res) {
    const id = req.params.id;
    try {
        const post = await getPostById(id);
        res.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export async function newPost(req, res) {
    const newPost = req.body;
    try {
        const post = await createPost(newPost);
        res.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export async function updateById(req, res) {
    const id = req.params.id;
    const updatePost = req.body;
    try {
        const post = await updatePostById(id, updatePost);
        res.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export async function eraseById(req, res) {
    const id = req.params.id;
    try {
        const post = await removePost(id);
        res.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export async function uploadImage(req, res) {
    const postImage = {
        title: "",
        description: "",
        urlImg: req.file.originalname,
        alt: ""
    }
    try {
        const post = await createPost(postImage);
        const ext = req.file.originalname.split(".").pop().toLowerCase();
        const image = `uploads/${post.insertedId}.${ext}`;
        fs.renameSync(req.file.path, image);
        res.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export async function updateImage(req, res) {
    const id = req.params.id;
    try {
        const postFrom = await getPostById(id);
        const ext = postFrom.urlImg.split(".").pop().toLowerCase();
        const urlImg = `http://localhost:5000/uploads/${id}.${ext}`;

        // const mime = ext === "jpg" ? "image/jpeg" : `image/${ext}`;
        // const imgBuffer = fs.readFileSync(`uploads/${id}.${ext}`);
        // const description = await generateDescriptionWithGemini(imgBuffer, mime);

        const updatePost = {
            title: req.body.title,
            description: req.body.description,
            urlImg: urlImg,
            alt: req.body.alt
        }

        const post = await updatePostById(id, updatePost);
        res.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }

}