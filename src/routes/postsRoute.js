import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import { allPosts, createNewPost, imagePost, postById, removePost, updateImagePost, updatePost } from "../controllers/postsController.js";


const basedir = path.join(import.meta.dirname, "../../");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(basedir, "uploads/"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200,
}

const upload = multer({ storage: storage });

const routesOfPosts = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get("/posts", allPosts);
    app.get("/posts/:id", postById);
    app.post("/posts", createNewPost);
    app.put("/posts/:id", updatePost);
    app.post("/upload", upload.single("image"), imagePost);
    app.put("/upload/:id", updateImagePost);
    app.delete("/posts/:id", removePost);
}

export default routesOfPosts;