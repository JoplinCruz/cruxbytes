import { getAllUsers } from "../models/models.js";


export async function allUsers(req, res) {
    try {
        // callback getAllUser's function to search all users
        const users = await getAllUsers();

        // if success, return all users with status 200 (ok)
        res.status(200).json(users);
    } catch (error) {

        // if an error ocurred, then return status code 500 with an error message
        res.status(500).json({ message: "Error to find users", error });
    }
}