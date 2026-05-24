import { Router } from "express";
import { Profile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { UpdateProfile } from "../controllers/user.controller.js";
import { deleteProfile } from "../controllers/user.controller.js"
const UserRouter = Router();


UserRouter.post('/profile', Profile)
UserRouter.patch('/update-profile',  UpdateProfile)
UserRouter.delete('/delete-profile/:id', deleteProfile)
export default UserRouter