import express from "express";
import cors from "cors";
import multer from "multer";
import { eraseById, getAll, getById, newPost, updateById, uploadImage } from "./controller";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }); // const upload = multer*({ dest: "uploads" });

const corsOption = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const routes = (app) => {
    app.use(express.json());
    app.use(cors.config(corsOption));
    app.get("/", getAll);
    app.get("/:id", getById);
    app.post("/", newPost);
    app.put("/:id", updateById);
    app.delete("/:id", eraseById);
    app.post("/upload", upload.single("image"), uploadImage);
    app.put("/upload/:id", updateImage)
}

export default routes;