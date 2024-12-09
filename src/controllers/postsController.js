import fs from "fs";
import path from "path";
import generateDescriptionWithGemini from "../services/geminiService.js";
import { getAllPosts, createPost, updatePostById, getPostById, removePostById } from "../models/models.js";


const basedir = path.join(import.meta.dirname, "../../");

export async function allPosts(req, res) {
    try {
        const posts = await getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export async function postById(req, res) {
    const index = req.params.id

    try {
        const post = await getPostById(index);
        res.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }

}

export async function createNewPost(req, res) {
    const post = req.body;

    try {
        const createdPost = await createPost(post);
        res.status(200).json(createdPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export async function updatePost(req, res) {
    const index = req.params.id;
    const newPost = req.body;

    try {
        const post = await updatePostById(index, newPost);
        res.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export async function imagePost(req, res) {
    const post = {
        description: "",
        imgUrl: req.file.originalname,
        alt: "",
    };

    try {
        const createdPost = await createPost(post);
        const ext = req.file.originalname.split(".").pop().toLowerCase();
        const actualImage = `${createdPost.insertedId}.${ext}`;
        console.log(req.file.path);
        fs.renameSync(req.file.path, path.join("uploads", actualImage));
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Require failed" });
    }
}

export async function updateImagePost(req, res) {
    const index = req.params.id;

    try {
        const postFrom = await getPostById(index);
        const ext = postFrom.imgUrl.split(".").pop().toLowerCase();
        const urlImage = `http://localhost:3000/${index}.${ext}`;

        const mimetype = ext === "jpg" ? "image/jpeg" : `image/${ext}`;
        const imgBuffer = fs.readFileSync(path.join(basedir, "uploads", `${index}.${ext}`));
        const description = await generateDescriptionWithGemini(imgBuffer, mimetype);

        const post = {
            imgUrl: urlImage,
            description: description,
            alt: req.body.alt,
        }

        const imageUpdate = await updatePostById(index, post);
        res.status(200).json(imageUpdate);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export async function removePost(req, res) {
    const index = req.params.id;

    try {
        const post = await getPostById(index);
        if (post.imgUrl) {
            const ext = post.imgUrl.split(".").pop().toLowerCase();
            const removedFile = fs.unlinkSync(path.join(basedir, "uploads", `${index}.${ext}`));
        }
        const removedPost = await removePostById(index);
        res.status(200).json(removedPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}
