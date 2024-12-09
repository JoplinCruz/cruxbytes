import express from "express";
import path from "path";
import routesOfPosts from "./src/routes/postsRoute.js";


const basedir = import.meta.dirname;

const app = express();
app.use(express.static(path.join(basedir, "uploads")));
routesOfPosts(app);

app.listen(3000, () => {
    console.log("Server listening...");
});
