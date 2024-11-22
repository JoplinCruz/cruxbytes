import fs from "fs";
import { getAllPosts, createPost, updatePostById, getPostById, removePostById } from "../models/models.js";
import generateDescriptionWithGemini from "../services/geminiService.js";


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
        const actualImage = `uploads/${createdPost.insertedId}.${ext}`;
        fs.renameSync(req.file.path, actualImage);
        res.status(200).json(createdPost);
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
        const mimetype = ext === "jpg" ? "image/jpeg" : `image/${ext}`;

        const urlImage = `http://localhost:3000/${index}.${ext}`;
        const imgBuffer = fs.readFileSync(`uploads/${index}.${ext}`);
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
    // const urlImage = `http://localhost:3000/${id}.${ext}`;
    try {
        const post = await getPostById(index);
        if (post.imgUrl) {
            const ext = post.imgUrl.split(".").pop().toLowerCase();
            const removedFile = fs.unlinkSync(`uploads/${index}.${ext}`);
        }
        const removedPost = await removePostById(index);
        res.status(200).json(removedPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

// export async function updateImagePost(req, res) {
//     const id = req.params.id;
//     const urlImage = `http://localhost:3000/${id}.png`;
//     const post = {
//         imgUrl: urlImage,
//         description: req.body.description,
//         alt: req.body.alt,
//     }
//     try {
//         const imageUpdate = await updatePostById(id, post);
//         res.status(200).json(imageUpdate);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// }
