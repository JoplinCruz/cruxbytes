import express from "express";
import routesOfPosts from "./src/routes/postsRoute.js";
// import routesOfUsers from "./src/routes/usersRoute.js";

const app = express();
app.use(express.static("uploads"));
routesOfPosts(app);
// routesOfUsers(app);

app.listen(3000, () => {
    console.log("Server listening...");
});
