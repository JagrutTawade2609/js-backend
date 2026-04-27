import { Router } from "express";
import { profile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const UserRouter = Router();


UserRouter.post('/profile', authMiddleware, profile)

export default UserRouter