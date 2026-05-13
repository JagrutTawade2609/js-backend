import { Router } from "express";
import { profile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { updateProfile } from "../controllers/user.controller.js";
import { deleteProfile } from "../controllers/user.controller.js";
const UserRouter = Router();


UserRouter.post('/profile', authMiddleware, profile)
UserRouter.patch('/update-profile/:id',  updateProfile)
UserRouter.delete('/delete-profile/:id', deleteProfile)
export default UserRouter