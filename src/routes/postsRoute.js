import express from "express";
import multer from "multer";
import cors from "cors";
import { allPosts, createNewPost, imagePost, postById, removePost, updateImagePost, updatePost } from "../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200,
}

const upload = multer({ dest: "./uploads", storage });


const routesOfPosts = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get("/posts", allPosts);
    app.get("/posts/:id", postById);
    app.post("/posts", createNewPost);
    app.put("/posts/:id", updatePost);
    app.post("/upload", upload.single("image"), imagePost);
    app.put("/upload/:id", updateImagePost);
    app.delete("/posts/:id", removePost)
}

export default routesOfPosts;