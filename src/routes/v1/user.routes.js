import { Router } from "express";
import userController from "../../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/", userController.getAllUsers);
userRoutes.get("/:id", userController.getUserById);

export default userRoutes;
