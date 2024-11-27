import express from "express";
import routes from "./appRoute.js";

const app = express();
app.use(express.static("uploads"));

routes(app);

app.listen(5000, () => {
    console.log("Server listening");
});
