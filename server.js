import express from "express";
import routesOfPosts from "./src/routes/postsRoute.js";

const app = express();
app.use(express.static("uploads"));
routesOfPosts(app);

app.listen(3000, () => {
    console.log("Server listening...");
});
