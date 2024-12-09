import express from "express";
import path from "path";
import routesOfPosts from "./src/routes/postsRoute.js";

const app = express();
app.use(express.static(path.join(process.cwd(), "uploads")));
routesOfPosts(app);

app.listen(3000, () => {
    console.log("Server listening...");
});
