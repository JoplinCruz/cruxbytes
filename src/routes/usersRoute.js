import express from "express";
import { allUsers } from "../controllers/usersController.js";

const routesOfUsers = (app) => {
    app.use(express.json());
    app.get("/users", allUsers);
}

export default routesOfUsers;